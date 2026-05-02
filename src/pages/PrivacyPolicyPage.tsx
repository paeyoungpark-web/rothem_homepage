import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicyPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 prose prose-slate max-w-none">
          {lang === 'ko' ? (
            <>
              <h1 className="text-3xl font-bold text-slate-900 mb-8 border-b pb-4">개인정보 처리방침</h1>
              <p className="text-sm text-slate-500 mb-8">시행일: {today} (최초 제정)</p>

              <p>
                <strong>로뎀시스템</strong>(이하 '회사'라고 합니다)은(는) 개인정보보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
              </p>

              <h3>제1조 (개인정보의 처리 목적)</h3>
              <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
              <ul>
                <li><strong>고객 문의 처리:</strong> 프로젝트 문의 등록, 고객의 신원 확인, 문의사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를 처리합니다.</li>
              </ul>

              <h3>제2조 (처리하는 개인정보의 항목)</h3>
              <p>회사는 고객 문의 처리를 위해 아래와 같은 최소한의 개인정보를 수집하고 있습니다.</p>
              <ul>
                <li><strong>필수항목:</strong> 이름/회사명, 이메일</li>
                <li><strong>선택항목:</strong> 연락처(전화번호)</li>
              </ul>

              <h3>제3조 (개인정보의 처리 및 보유 기간)</h3>
              <p>① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
              <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
              <ul>
                <li><strong>고객 문의 처리:</strong> 문의 접수 및 답변 완료 등 <strong>목적 달성 후 지체 없이 파기</strong>합니다.</li>
              </ul>

              <h3>제4조 (개인정보의 제3자 제공에 관한 사항)</h3>
              <p>회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다. 현재 회사는 개인정보를 제3자에게 제공하고 있지 않습니다.</p>

              <h3>제5조 (개인정보 처리업무의 위탁)</h3>
              <p>회사는 원활한 개인정보 업무처리를 위하여 개인정보 처리업무를 위탁하고 있지 않습니다. 향후 위탁업무가 발생할 경우, 수탁자와 위탁 업무의 내용에 대해 당해 개인정보 처리방침을 통하여 지체 없이 공개하겠습니다.</p>

              <h3>제6조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법)</h3>
              <p>① 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
              <p>② 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</p>
              <p>③ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</p>
              <p>④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.</p>

              <h3>제7조 (개인정보의 파기절차 및 파기방법)</h3>
              <p>① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
              <p>② 파기절차 및 기한:</p>
              <ul>
                <li>이용자가 입력한 정보는 목적 달성 후 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.</li>
                <li>파기기한: 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.</li>
              </ul>
              <p>③ 파기방법:</p>
              <ul>
                <li>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
                <li>종이에 출력된 개인정보는 분쇄기로 파쇄하거나 소각을 통하여 파기합니다.</li>
              </ul>

              <h3>제8조 (개인정보의 안전성 확보 조치)</h3>
              <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
              <ol>
                <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
                <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
                <li>물리적 조치: 자료보관실 등의 접근통제</li>
              </ol>

              <h3>제9조 (개인정보 보호책임자)</h3>
              <p>① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
              <ul>
                <li>개인정보 보호책임자 이메일: rothem@rothemsystem.com</li>
              </ul>
              <p>② 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</p>

              <h3>제10조 (개인정보 처리방침 변경)</h3>
              <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>

              <div className="mt-12 text-sm text-slate-500">
                <p>- 시행일자: {today}</p>
                <p>- 최초 제정일자: {today}</p>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-slate-900 mb-8 border-b pb-4">Privacy Policy</h1>
              <p className="text-sm text-slate-500 mb-8">Effective Date: {today} (Initial Enactment)</p>

              <p>
                <strong>rothemsystem</strong> (hereinafter referred to as the 'Company') establishes and discloses the following privacy policy in accordance with Article 30 of the Personal Information Protection Act to protect users' personal information and efficiently process grievances related to it.
              </p>

              <h3>Article 1 (Purpose of Processing Personal Information)</h3>
              <p>The Company processes personal information for the following purposes. The processed personal information will not be used for any purpose other than the following, and if the purpose of use changes, necessary measures such as obtaining separate consent in accordance with Article 18 of the 「Personal Information Protection Act」 will be implemented.</p>
              <ul>
                <li><strong>Customer Inquiry Processing:</strong> Personal information is processed for the purpose of registering project inquiries, verifying customer identity, checking inquiry details, contacting/notifying for factual investigation, and notifying processing results.</li>
              </ul>

              <h3>Article 2 (Items of Personal Information Processed)</h3>
              <p>The Company collects the following minimum personal information to process customer inquiries.</p>
              <ul>
                <li><strong>Required items:</strong> Name / Company name, Email</li>
                <li><strong>Optional items:</strong> Contact (Phone number)</li>
              </ul>

              <h3>Article 3 (Processing and Retention Period of Personal Information)</h3>
              <p>① The Company processes and retains personal information within the retention and use period agreed upon when collecting personal information from the data subject or the period prescribed by law.</p>
              <p>② The respective processing and retention periods are as follows:</p>
              <ul>
                <li><strong>Customer Inquiry Processing:</strong> Destroyed without delay after the purpose is achieved, such as completion of inquiry registration and response.</li>
              </ul>

              <h3>Article 4 (Provision of Personal Information to Third Parties)</h3>
              <p>The Company processes the data subject's personal information only within the scope specified in Article 1 (Purpose of Processing Personal Information) and provides personal information to third parties only in cases that fall under Articles 17 and 18 of the 「Personal Information Protection Act」, such as the data subject's consent or special provisions of the law. Currently, the Company does not provide personal information to any third parties.</p>

              <h3>Article 5 (Entrustment of Personal Information Processing)</h3>
              <p>The Company does not entrust personal information processing tasks for smooth business operations. In the future, if entrusted tasks arise, we will disclose the contents of the entrusted tasks and the trustee without delay through this privacy policy.</p>

              <h3>Article 6 (Rights and Obligations of Data Subjects and Legal Representatives and How to Exercise Them)</h3>
              <p>① Data subjects can exercise rights against the Company at any time to request viewing, correction, deletion, or suspension of processing of personal information.</p>
              <p>② The exercise of rights can be done through document, email, and facsimile transmission (FAX) to the Company in accordance with Article 41 Paragraph 1 of the Enforcement Decree of the Personal Information Protection Act, and the Company will take action without delay.</p>

              <h3>Article 7 (Destruction of Personal Information)</h3>
              <p>① The Company destroys personal information without delay when the personal information becomes unnecessary, such as the expiration of the personal information retention period or the achievement of the processing purpose.</p>
              <p>② Destruction procedure and methods: Information entered by the user is destroyed immediately or after being stored for a certain period according to internal policies and other relevant laws after the purpose is achieved. Electronic files are permanently deleted using technical methods that cannot restore records. Personal information printed on paper is shredded with a shredder or destroyed through incineration.</p>

              <h3>Article 8 (Measures to Ensure the Safety of Personal Information)</h3>
              <p>The Company takes managerial, technical, and physical measures necessary to secure safety. </p>

              <h3>Article 9 (Personal Information Protection Officer)</h3>
              <p>The Company is responsible for the overall processing of personal information and designates a Personal Information Protection Officer for complaint handling and damage relief of data subjects related to personal information processing.</p>
              <ul>
                <li>Email: rothem@rothemsystem.com</li>
              </ul>

              <h3>Article 10 (Changes to Privacy Policy)</h3>
              <p>This Privacy Policy is effective from the enforcement date. If there is any addition, deletion, or correction of the contents according to related laws or policies, it will be announced through notices 7 days prior to the enforcement of the changes.</p>

              <div className="mt-12 text-sm text-slate-500">
                <p>- Effective Date: {today}</p>
                <p>- Initial Enactment Date: {today}</p>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
