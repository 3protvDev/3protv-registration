# 관리자용 세팅 가이드 (10분)

## Step 1. Google Form 생성

1. [forms.google.com](https://forms.google.com) → 새 폼
2. 폼 제목: `3PRO TV AI 툴 현황 조사`
3. 다음 39개 필드를 &ldquo;단답형&rdquo;으로 추가:

### 응답자 공통 (3개)
- 이름 (단답형)
- 소속 팀 / 부서 (단답형)
- 이메일 (단답형)

### 6개 툴 × 5필드 = 30개
각 툴(Vrew, Cutback, Genspark, Gemini, Claude, ChatGPT)마다:
- `{툴명} - 사용 여부` (단답형)
- `{툴명} - 계정 소유` (단답형)
- `{툴명} - 결제 카드` (단답형)
- `{툴명} - 플랜명` (단답형)
- `{툴명} - 월 결제 금액(원)` (단답형)

> Tip: 첫 번째 툴 필드 5개를 만든 뒤 &ldquo;복제&rdquo; 아이콘으로 6번 반복하면 빠릅니다.

## Step 2. entry ID 추출

1. 폼 오른쪽 상단 ⋮ 메뉴 → **&ldquo;미리 채워진 링크 가져오기&rdquo;**
2. 모든 필드에 임의값 입력 후 &ldquo;링크 가져오기&rdquo; 클릭
3. 복사된 URL을 텍스트 편집기에 붙여넣기
4. URL 안의 `entry.XXXXXXXX=값` 패턴을 필드마다 하나씩 추출
5. `index.html` 하단 `NAME_MAP` 오브젝트의 각 entry.XXX를 실제 값으로 교체

### 예시
```
원본 URL 조각: ...&entry.1854762321=홍길동&entry.928374651=콘텐츠팀...

index.html 매핑:
  respondent_name: "entry.1854762321",
  respondent_team: "entry.928374651",
```

## Step 3. FORM_ACTION_URL 설정

폼의 정식 공유 링크가:
```
https://docs.google.com/forms/d/e/1FAIpQLSf...abc/viewform
```
이라면 `viewform` → `formResponse` 로 바꿔서 `index.html` 상단에 붙여넣기:
```js
const FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf...abc/formResponse";
```

## Step 4. 응답 시트 연결

1. 폼 편집 화면 → **&ldquo;응답&rdquo;** 탭
2. 초록색 스프레드시트 아이콘 클릭
3. &ldquo;새 스프레드시트 만들기&rdquo; 선택 → 완료
4. 이제 폼 제출이 시트에 자동으로 로우로 쌓입니다

## Step 5. 시트 후처리 (선택)

응답 시트가 &ldquo;와이드 포맷&rdquo;(한 응답자 = 한 로우, 툴 필드가 옆으로 나열)으로 저장됩니다.
피벗 테이블용 &ldquo;롱 포맷&rdquo;이 필요하면 별도 시트에 다음 수식:

```
=QUERY({
  ARRAYFORMULA({A2:D, "Vrew"&{"","","","",""}, E2:I});
  ARRAYFORMULA({A2:D, "Cutback"&{"","","","",""}, J2:N});
  ...
})
```

또는 관리부에서 Genspark/Claude로 &ldquo;wide → long&rdquo; 변환 스크립트 요청.

## Step 6. 직원에게 배포

`index.html` 을 다음 중 하나로 호스팅:
- **GitHub Pages** (무료) — repo 만들어 push하면 자동 서빙
- **Vercel / Netlify** (무료) — drag & drop 배포
- **회사 내부 서버** — 정적 파일이라 어디든 OK
- **Slack Canvas** — HTML 통째로 붙여넣기도 가능

그 후 Slack 공지사항에 링크 뿌리고 마감일 설정.

---

## 검증 체크리스트

- [ ] `NAME_MAP` 의 39개 entry ID가 모두 실제 값인지
- [ ] `FORM_ACTION_URL` 이 `formResponse` 로 끝나는지
- [ ] 폼 &ldquo;응답 수집 중&rdquo; 상태가 ON인지
- [ ] 시트 연결이 되어 있는지
- [ ] 본인이 테스트 제출해서 시트에 로우가 쌓이는지
