export default function Home() {
  return (
    <div style={{ alignItems: 'center' }}>
      {Array(20)
        .fill(0)
        .map((_, i) => (
          <div key={i} style={{ marginTop: '10vh' }}>
            <h1>TItle</h1>
            <span>
              모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다. 이
              헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의
              규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다. 모든 국민은
              사생활의 비밀과 자유를 침해받지 아니한다. 국무총리는 대통령을
              보좌하며, 행정에 관하여 대통령의 명을 받아 행정각부를 통할한다.\n
              법률안에 이의가 있을 때에는 대통령은 제1항의 기간내에 이의서를
              붙여 국회로 환부하고, 그 재의를 요구할 수 있다. 국회의 폐회중에도
              또한 같다. 대통령은 국무회의의 의장이 되고, 국무총리는 부의장이
              된다. 피고인의 자백이 고문·폭행·협박·구속의 부당한 장기화 또는
              기망 기타의 방법에 의하여 자의로 진술된 것이 아니라고 인정될 때
              또는 정식재판에 있어서 피고인의 자백이 그에게 불리한 유일한 증거일
              때에는 이를 유죄의 증거로 삼거나 이를 이유로 처벌할 수 없다. 모든
              국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를
              가진다. 국가는 개인이 가지는 불가침의 기본적 인권을 확인하고 이를
              보장할 의무를 진다. 모든 국민은 행위시의 법률에 의하여 범죄를
              구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여
              거듭 처벌받지 아니한다. 지방의회의 조직·권한·의원선거와
              지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에
              관한 사항은 법률로 정한다. 통신·방송의 시설기준과 신문의 기능을
              보장하기 위하여 필요한 사항은 법률로 정한다. 헌법재판소는 법률에
              저촉되지 아니하는 범위안에서 심판에 관한 절차, 내부규율과
              사무처리에 관한 규칙을 제정할 수 있다. 계엄을 선포한 때에는
              대통령은 지체없이 국회에 통고하여야 한다. 국회는 상호원조 또는
              안전보장에 관한 조약, 중요한 국제조직에 관한 조약,
              우호통상항해조약, 주권의 제약에 관한 조약, 강화조약, 국가나
              국민에게 중대한 재정적 부담을 지우는 조약 또는 입법사항에 관한
              조약의 체결·비준에 대한 동의권을 가진다. 국민경제자문회의의
              조직·직무범위 기타 필요한 사항은 법률로 정한다. 국회는 의원의
              자격을 심사하며, 의원을 징계할 수 있다. 형사피의자 또는
              형사피고인으로서 구금되었던 자가 법률이 정하는 불기소처분을 받거나
              무죄판결을 받은 때에는 법률이 정하는 바에 의하여 국가에 정당한
              보상을 청구할 수 있다.
            </span>
          </div>
        ))}
    </div>
  );
}