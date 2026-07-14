// ================================================================
//  Google Apps Script — 3PRO TV AI 툴 조사 → Google Sheets 연동
//
//  배포 방법:
//  1. https://script.google.com 에서 새 프로젝트 생성
//  2. 이 코드 전체를 붙여넣기
//  3. 상단 배포 → 새 배포 → 유형: 웹 앱
//     - 다음 사용자로 실행: 나(본인 계정)
//     - 액세스 권한: 모든 사용자
//  4. 배포 후 나오는 URL을 index.html 의 APPS_SCRIPT_URL 에 붙여넣기
// ================================================================

const SPREADSHEET_ID = "1NQ8L0XrWozQd-xlOu3uAs94uX00K7ybTV7VGtnEc1Fg";
const SHEET_NAME = "Sheet1"; // 실제 시트 탭 이름으로 변경하세요

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // 헤더가 없으면 첫 행에 삽입
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "제출시각",
        "이름", "팀/부서", "이메일",
        "Vrew_사용여부", "Vrew_계정소유자", "Vrew_결제카드", "Vrew_플랜", "Vrew_금액(원)",
        "Cutback_사용여부", "Cutback_계정소유자", "Cutback_결제카드", "Cutback_플랜", "Cutback_금액(원)",
        "Genspark_사용여부", "Genspark_계정소유자", "Genspark_결제카드", "Genspark_플랜", "Genspark_금액(원)",
        "Gemini_사용여부", "Gemini_계정소유자", "Gemini_결제카드", "Gemini_플랜", "Gemini_금액(원)",
        "Claude_사용여부", "Claude_계정소유자", "Claude_결제카드", "Claude_플랜", "Claude_금액(원)",
        "ChatGPT_사용여부", "ChatGPT_계정소유자", "ChatGPT_결제카드", "ChatGPT_플랜", "ChatGPT_금액(원)",
        "기타AI툴_자유입력",
      ]);
    }

    const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    sheet.appendRow([
      now,
      data.respondent_name  || "",
      data.respondent_team  || "",
      data.respondent_email || "",
      data.vrew_use     || "", data.vrew_account     || "", data.vrew_card     || "", data.vrew_plan     || "", data.vrew_price     || "",
      data.cutback_use  || "", data.cutback_account  || "", data.cutback_card  || "", data.cutback_plan  || "", data.cutback_price  || "",
      data.genspark_use || "", data.genspark_account || "", data.genspark_card || "", data.genspark_plan || "", data.genspark_price || "",
      data.gemini_use   || "", data.gemini_account   || "", data.gemini_card   || "", data.gemini_plan   || "", data.gemini_price   || "",
      data.claude_use   || "", data.claude_account   || "", data.claude_card   || "", data.claude_plan   || "", data.claude_price   || "",
      data.chatgpt_use  || "", data.chatgpt_account  || "", data.chatgpt_card  || "", data.chatgpt_plan  || "", data.chatgpt_price  || "",
      data.other_text   || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// CORS preflight 대응 (OPTIONS)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
