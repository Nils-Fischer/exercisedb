<script lang="ts">
  import { page } from "$app/stores";

  const supportMail = "support@trainalyze.de";
  const adminMail = "nils.fischer@trainalyze.de";
</script>

<div class="mx-auto max-w-3xl text-sm">
  <h1 class="mb-4 text-2xl font-bold">Datenschutzerklärung</h1>

  <section class="mb-6">
    <h2 class="mb-2 text-lg font-semibold">1. Name und Anschrift des Verantwortlichen</h2>
    <p class="mb-2">
      Der Verantwortliche im Sinne der Datenschutz-Grundverordnung und anderer nationaler Datenschutzgesetze der
      Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen ist:
    </p>
    <div class="rounded bg-neutral p-2">
      <p>TrainTech</p>
      <p>Erftstraße 15-17</p>
      <p>50672 Köln</p>
      <p>Deutschland</p>
      <a class="link-hover link text-secondary" href="mailto:{supportMail}">{supportMail}</a>
      <p>Website: {$page.url.origin}</p>
    </div>
  </section>

  <section class="mb-6">
    <h2 class="mb-2 text-lg font-semibold">2. Name und Anschrift des Datenschutzbeauftragten</h2>
    <p class="mb-2">Der Datenschutzbeauftragte des Verantwortlichen ist:</p>
    <div class="rounded bg-neutral p-2">
      <p>Nils Fischer</p>
      <p>TrainTech</p>
      <p>Erftstraße 15-17</p>
      <p>50672 Köln</p>
      <p>Deutschland</p>
      <a class="link-hover link text-secondary" href="mailto:{adminMail}">{adminMail}</a>
    </div>
  </section>

  <section class="mb-6">
    <h2 class="mb-2 text-lg font-semibold">3. Allgemeines zur Datenverarbeitung</h2>

    <h3 class="mb-2 mt-4 text-base font-semibold">3.1 Umfang der Verarbeitung personenbezogener Daten</h3>
    <p class="mb-2">
      Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer
      funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener
      Daten unserer Nutzer erfolgt regelmäßig nur nach Einwilligung des Nutzers.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">3.2 Rechtsgrundlage für die Verarbeitung personenbezogener Daten</h3>
    <p class="mb-2">
      Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person einholen,
      dient Art. 6 Abs. 1 lit. a EU-Datenschutzgrundverordnung (DSGVO) als Rechtsgrundlage.
    </p>
    <p class="mb-2">
      Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages erforderlich ist, dient Art. 6
      Abs. 1 lit. b DSGVO als Rechtsgrundlage. Dies gilt auch für Verarbeitungsvorgänge, die zur Durchführung
      vorvertraglicher Maßnahmen erforderlich sind.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">3.3 Datenlöschung und Speicherdauer</h3>
    <p class="mb-2">
      Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der Speicherung
      entfällt. Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den europäischen oder nationalen
      Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der Verantwortliche
      unterliegt, vorgesehen wurde.
    </p>
  </section>

  <section class="mb-6">
    <h2 class="mb-2 text-lg font-semibold">4. Bereitstellung der Website und Erstellung von Logfiles</h2>

    <h3 class="mb-2 mt-4 text-base font-semibold">4.1 Beschreibung und Umfang der Datenverarbeitung</h3>
    <p class="mb-2">
      Bei jedem Aufruf unserer Internetseite erfasst unser System automatisiert Daten und Informationen vom
      Computersystem des aufrufenden Rechners. Folgende Daten werden hierbei erhoben:
    </p>
    <ul class="mb-2 list-inside list-disc">
      <li>Informationen über den Browsertyp und die verwendete Version</li>
      <li>Das Betriebssystem des Nutzers</li>
      <li>Den Internet-Service-Provider des Nutzers</li>
      <li>Datum und Uhrzeit des Zugriffs</li>
    </ul>
    <p class="mb-2">
      Die Daten werden ebenfalls in den Logfiles unseres Systems gespeichert. Eine Speicherung dieser Daten zusammen mit
      anderen personenbezogenen Daten des Nutzers findet nicht statt.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">4.2 Rechtsgrundlage für die Datenverarbeitung</h3>
    <p class="mb-2">Rechtsgrundlage für die vorübergehende Speicherung der Daten ist Art. 6 Abs. 1 lit. f DSGVO.</p>

    <h3 class="mb-2 mt-4 text-base font-semibold">4.3 Zweck der Datenverarbeitung</h3>
    <p class="mb-2">
      Die vorübergehende Speicherung der Daten durch das System ist notwendig, um eine Auslieferung der Website an den
      Rechner des Nutzers zu ermöglichen. Hierfür muss die IP-Adresse des Nutzers für die Dauer der Sitzung gespeichert
      bleiben.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">4.4 Dauer der Speicherung</h3>
    <p class="mb-2">
      Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind.
      Im Falle der Erfassung der Daten zur Bereitstellung der Website ist dies der Fall, wenn die jeweilige Sitzung
      beendet ist.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">4.5 Widerspruchs- und Beseitigungsmöglichkeit</h3>
    <p class="mb-2">
      Die Erfassung der Daten zur Bereitstellung der Website und die Speicherung der Daten in Logfiles ist für den
      Betrieb der Internetseite zwingend erforderlich. Es besteht folglich seitens des Nutzers keine
      Widerspruchsmöglichkeit.
    </p>
  </section>

  <section class="mb-6">
    <h2 class="mb-2 text-lg font-semibold">5. Verwendung von Cookies</h2>

    <h3 class="mb-2 mt-4 text-base font-semibold">5.1 Beschreibung und Umfang der Datenverarbeitung</h3>
    <p class="mb-2">
      Unsere Webseite verwendet Cookies. Bei Cookies handelt es sich um Textdateien, die im Internetbrowser bzw. vom
      Internetbrowser auf dem Computersystem des Nutzers gespeichert werden. Wir setzen Cookies ein, um unsere Website
      nutzerfreundlicher zu gestalten. Einige Elemente unserer Internetseite erfordern es, dass der aufrufende Browser
      auch nach einem Seitenwechsel identifiziert werden kann.
    </p>
    <p class="mb-2">In den Cookies werden dabei folgende Daten gespeichert und übermittelt:</p>
    <ul class="mb-2 list-inside list-disc">
      <li>Log-In-Informationen</li>
    </ul>

    <h3 class="mb-2 mt-4 text-base font-semibold">5.2 Rechtsgrundlage für die Datenverarbeitung</h3>
    <p class="mb-2">
      Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten unter Verwendung von Cookies ist Art. 6 Abs. 1
      lit. f DSGVO.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">5.3 Zweck der Datenverarbeitung</h3>
    <p class="mb-2">
      Der Zweck der Verwendung technisch notwendiger Cookies ist, die Nutzung von Websites für die Nutzer zu
      vereinfachen. Einige Funktionen unserer Internetseite können ohne den Einsatz von Cookies nicht angeboten werden.
      Für diese ist es erforderlich, dass der Browser auch nach einem Seitenwechsel wiedererkannt wird.
    </p>
    <p class="mb-2">Für folgende Anwendungen benötigen wir Cookies:</p>
    <ul class="mb-2 list-inside list-disc">
      <li>Aufrechterhaltung der Anmeldung</li>
    </ul>
    <p class="mb-2">
      Die durch technisch notwendige Cookies erhobenen Nutzerdaten werden nicht zur Erstellung von Nutzerprofilen
      verwendet.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">
      5.4 Dauer der Speicherung, Widerspruchs- und Beseitigungsmöglichkeit
    </h3>
    <p class="mb-2">
      Cookies werden auf dem Rechner des Nutzers gespeichert und von diesem an unsere Seite übermittelt. Daher haben Sie
      als Nutzer auch die volle Kontrolle über die Verwendung von Cookies. Durch eine Änderung der Einstellungen in
      Ihrem Internetbrowser können Sie die Übertragung von Cookies deaktivieren oder einschränken. Bereits gespeicherte
      Cookies können jederzeit gelöscht werden. Dies kann auch automatisiert erfolgen. Werden Cookies für unsere Website
      deaktiviert, können möglicherweise nicht mehr alle Funktionen der Website vollumfänglich genutzt werden.
    </p>
  </section>

  <section class="mb-6">
    <h2 class="mb-2 text-lg font-semibold">6. Registrierung</h2>

    <h3 class="mb-2 mt-4 text-base font-semibold">6.1 Beschreibung und Umfang der Datenverarbeitung</h3>
    <p class="mb-2">
      Auf unserer Internetseite bieten wir Nutzern die Möglichkeit, sich unter Angabe personenbezogener Daten zu
      registrieren. Die Daten werden dabei in eine Eingabemaske eingegeben und an uns übermittelt und gespeichert. Eine
      Weitergabe der Daten an Dritte findet nicht statt. Folgende Daten werden im Rahmen des Registrierungsprozesses
      erhoben:
    </p>
    <ul class="mb-2 list-inside list-disc">
      <li>Alter</li>
      <li>Voller Name</li>
      <li>Geschlecht</li>
      <li>E-Mail-Adresse</li>
      <li>Anmeldedatum</li>
    </ul>
    <p class="mb-2">Im Zeitpunkt der Registrierung werden zudem folgende Daten gespeichert:</p>
    <ul class="mb-2 list-inside list-disc">
      <li>Datum und Uhrzeit der Registrierung</li>
    </ul>

    <h3 class="mb-2 mt-4 text-base font-semibold">6.2 Rechtsgrundlage für die Datenverarbeitung</h3>
    <p class="mb-2">
      Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung des Nutzers Art. 6 Abs. 1 lit.
      a DSGVO. Dient die Registrierung der Erfüllung eines Vertrages, dessen Vertragspartei der Nutzer ist oder der
      Durchführung vorvertraglicher Maßnahmen, so ist zusätzliche Rechtsgrundlage für die Verarbeitung der Daten Art. 6
      Abs. 1 lit. b DSGVO.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">6.3 Zweck der Datenverarbeitung</h3>
    <p class="mb-2">
      Eine Registrierung des Nutzers ist für das Bereithalten bestimmter Inhalte und Leistungen auf unserer Website
      erforderlich. Zudem dient die Registrierung zur Erfüllung eines Vertrages mit dem Nutzer oder zur Durchführung
      vorvertraglicher Maßnahmen.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">6.4 Dauer der Speicherung</h3>
    <p class="mb-2">
      Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind.
      Dies ist für die während des Registrierungsvorgangs erhobenen Daten der Fall, wenn die Registrierung auf unserer
      Internetseite aufgehoben oder abgeändert wird.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">6.5 Widerspruchs- und Beseitigungsmöglichkeit</h3>
    <p class="mb-2">
      Als Nutzer haben Sie jederzeit die Möglichkeit, die Registrierung aufzulösen. Die über Sie gespeicherten Daten
      können Sie jederzeit abändern lassen. Um Ihre Registrierung aufzulösen oder Ihre Daten ändern zu lassen,
      kontaktieren Sie uns bitte unter {supportMail}.
    </p>
  </section>

  <section class="mb-6">
    <h2 class="mb-2 text-lg font-semibold">7. Zahlungsabwicklung</h2>

    <h3 class="mb-2 mt-4 text-base font-semibold">7.1 Beschreibung und Umfang der Datenverarbeitung</h3>
    <p class="mb-2">
      Im Rahmen der Zahlungsabwicklung für unser Abonnement-Modell werden personenbezogene Daten verarbeitet. Die
      genauen Daten hängen vom gewählten Zahlungsanbieter ab.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">7.2 Rechtsgrundlage für die Datenverarbeitung</h3>
    <p class="mb-2">
      Die Rechtsgrundlage für die Verarbeitung der Daten ist Art. 6 Abs. 1 lit. b DSGVO, da die Verarbeitung für die
      Erfüllung eines Vertrages erforderlich ist.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">7.3 Zweck der Datenverarbeitung</h3>
    <p class="mb-2">
      Die Verarbeitung der Daten dient der Abwicklung von Zahlungen im Rahmen unseres Abonnement-Modells.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">7.4 Dauer der Speicherung</h3>
    <p class="mb-2">
      Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind.
      Im Falle von Daten, die zur Erfüllung eines Vertrages oder zur Durchführung vorvertraglicher Maßnahmen
      erforderlich sind, ist dies der Fall, wenn die Daten für die Durchführung des Vertrages nicht mehr erforderlich
      sind. Auch nach Abschluss des Vertrags kann eine Erforderlichkeit, personenbezogene Daten des Vertragspartners zu
      speichern, bestehen, um vertraglichen oder gesetzlichen Verpflichtungen nachzukommen.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">7.5 Widerspruchs- und Beseitigungsmöglichkeit</h3>
    <p class="mb-2">
      Die Bereitstellung der personenbezogenen Daten ist für den Vertragsabschluss erforderlich. Der Nutzer ist nicht
      verpflichtet, die personenbezogenen Daten bereitzustellen, die Nichtbereitstellung hätte jedoch zur Folge, dass
      der Vertrag mit dem Nutzer nicht geschlossen werden kann.
    </p>
  </section>

  <section class="mb-6">
    <h2 class="mb-2 text-lg font-semibold">8. Rechte der betroffenen Person</h2>
    <p class="mb-2">
      Werden personenbezogene Daten von Ihnen verarbeitet, sind Sie Betroffener i.S.d. DSGVO und es stehen Ihnen
      folgende Rechte gegenüber dem Verantwortlichen zu:
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">8.1 Auskunftsrecht</h3>
    <p class="mb-2">
      Sie können von dem Verantwortlichen eine Bestätigung darüber verlangen, ob personenbezogene Daten, die Sie
      betreffen, von uns verarbeitet werden. Liegt eine solche Verarbeitung vor, können Sie von dem Verantwortlichen
      über folgende Informationen Auskunft verlangen:
    </p>
    <ol class="mb-2 list-inside list-decimal">
      <li>die Zwecke, zu denen die personenbezogenen Daten verarbeitet werden;</li>
      <li>die Kategorien von personenbezogenen Daten, welche verarbeitet werden;</li>
      <li>
        die Empfänger bzw. die Kategorien von Empfängern, gegenüber denen die Sie betreffenden personenbezogenen Daten
        offengelegt wurden oder noch offengelegt werden;
      </li>
      <li>
        die geplante Dauer der Speicherung der Sie betreffenden personenbezogenen Daten oder, falls konkrete Angaben
        hierzu nicht möglich sind, Kriterien für die Festlegung der Speicherdauer;
      </li>
      <li>
        das Bestehen eines Rechts auf Berichtigung oder Löschung der Sie betreffenden personenbezogenen Daten, eines
        Rechts auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese
        Verarbeitung;
      </li>
      <li>das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde;</li>
      <li>
        alle verfügbaren Informationen über die Herkunft der Daten, wenn die personenbezogenen Daten nicht bei der
        betroffenen Person erhoben werden;
      </li>
    </ol>

    <h3 class="mb-2 mt-4 text-base font-semibold">8.2 Recht auf Berichtigung</h3>
    <p class="mb-2">
      Sie haben ein Recht auf Berichtigung und/oder Vervollständigung gegenüber dem Verantwortlichen, sofern die
      verarbeiteten personenbezogenen Daten, die Sie betreffen, unrichtig oder unvollständig sind. Der Verantwortliche
      hat die Berichtigung unverzüglich vorzunehmen.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">8.3 Recht auf Einschränkung der Verarbeitung</h3>
    <p class="mb-2">
      Unter den folgenden Voraussetzungen können Sie die Einschränkung der Verarbeitung der Sie betreffenden
      personenbezogenen Daten verlangen:
    </p>
    <ol class="mb-2 list-inside list-decimal">
      <li>
        wenn Sie die Richtigkeit der Sie betreffenden personenbezogenen für eine Dauer bestreiten, die es dem
        Verantwortlichen ermöglicht, die Richtigkeit der personenbezogenen Daten zu überprüfen;
      </li>
      <li>
        die Verarbeitung unrechtmäßig ist und Sie die Löschung der personenbezogenen Daten ablehnen und stattdessen die
        Einschränkung der Nutzung der personenbezogenen Daten verlangen;
      </li>
      <li>
        der Verantwortliche die personenbezogenen Daten für die Zwecke der Verarbeitung nicht länger benötigt, Sie diese
        jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen, oder
      </li>
      <li>
        wenn Sie Widerspruch gegen die Verarbeitung gemäß Art. 21 Abs. 1 DSGVO eingelegt haben und noch nicht feststeht,
        ob die berechtigten Gründe des Verantwortlichen gegenüber Ihren Gründen überwiegen.
      </li>
    </ol>
    <p class="mb-2">
      Wurde die Verarbeitung der Sie betreffenden personenbezogenen Daten eingeschränkt, dürfen diese Daten – von ihrer
      Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von
      Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen
      eines wichtigen öffentlichen Interesses der Union oder eines Mitgliedstaats verarbeitet werden.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">8.4 Recht auf Löschung</h3>
    <h4 class="mb-1 mt-2 text-sm font-semibold">8.4.1 Löschungspflicht</h4>
    <p class="mb-2">
      Sie können von dem Verantwortlichen verlangen, dass die Sie betreffenden personenbezogenen Daten unverzüglich
      gelöscht werden, und der Verantwortliche ist verpflichtet, diese Daten unverzüglich zu löschen, sofern einer der
      folgenden Gründe zutrifft:
    </p>
    <ol class="mb-2 list-inside list-decimal">
      <li>
        Die Sie betreffenden personenbezogenen Daten sind für die Zwecke, für die sie erhoben oder auf sonstige Weise
        verarbeitet wurden, nicht mehr notwendig.
      </li>
      <li>
        Sie widerrufen Ihre Einwilligung, auf die sich die Verarbeitung gem. Art. 6 Abs. 1 lit. a oder Art. 9 Abs. 2
        lit. a DSGVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung.
      </li>
      <li>
        Sie legen gem. Art. 21 Abs. 1 DSGVO Widerspruch gegen die Verarbeitung ein und es liegen keine vorrangigen
        berechtigten Gründe für die Verarbeitung vor, oder Sie legen gem. Art. 21 Abs. 2 DSGVO Widerspruch gegen die
        Verarbeitung ein.
      </li>
      <li>Die Sie betreffenden personenbezogenen Daten wurden unrechtmäßig verarbeitet.</li>
      <li>
        Die Löschung der Sie betreffenden personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach
        dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt.
      </li>
      <li>
        Die Sie betreffenden personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft
        gemäß Art. 8 Abs. 1 DSGVO erhoben.
      </li>
    </ol>

    <h4 class="mb-1 mt-2 text-sm font-semibold">8.4.2 Ausnahmen</h4>
    <p class="mb-2">Das Recht auf Löschung besteht nicht, soweit die Verarbeitung erforderlich ist</p>
    <ol class="mb-2 list-inside list-decimal">
      <li>zur Ausübung des Rechts auf freie Meinungsäußerung und Information;</li>
      <li>
        zur Erfüllung einer rechtlichen Verpflichtung, die die Verarbeitung nach dem Recht der Union oder der
        Mitgliedstaaten, dem der Verantwortliche unterliegt, erfordert, oder zur Wahrnehmung einer Aufgabe, die im
        öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen
        wurde;
      </li>
      <li>
        aus Gründen des öffentlichen Interesses im Bereich der öffentlichen Gesundheit gemäß Art. 9 Abs. 2 lit. h und i
        sowie Art. 9 Abs. 3 DSGVO;
      </li>
      <li>
        für im öffentlichen Interesse liegende Archivzwecke, wissenschaftliche oder historische Forschungszwecke oder
        für statistische Zwecke gem. Art. 89 Abs. 1 DSGVO, soweit das unter Abschnitt a) genannte Recht voraussichtlich
        die Verwirklichung der Ziele dieser Verarbeitung unmöglich macht oder ernsthaft beeinträchtigt, oder
      </li>
      <li>zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</li>
    </ol>

    <h3 class="mb-2 mt-4 text-base font-semibold">8.5 Recht auf Unterrichtung</h3>
    <p class="mb-2">
      Haben Sie das Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung gegenüber dem Verantwortlichen
      geltend gemacht, ist dieser verpflichtet, allen Empfängern, denen die Sie betreffenden personenbezogenen Daten
      offengelegt wurden, diese Berichtigung oder Löschung der Daten oder Einschränkung der Verarbeitung mitzuteilen, es
      sei denn, dies erweist sich als unmöglich oder ist mit einem unverhältnismäßigen Aufwand verbunden.
    </p>
    <p class="mb-2">
      Ihnen steht gegenüber dem Verantwortlichen das Recht zu, über diese Empfänger unterrichtet zu werden.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">8.6 Recht auf Datenübertragbarkeit</h3>
    <p class="mb-2">
      Sie haben das Recht, die Sie betreffenden personenbezogenen Daten, die Sie dem Verantwortlichen bereitgestellt
      haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten. Außerdem haben Sie das Recht
      diese Daten einem anderen Verantwortlichen ohne Behinderung durch den Verantwortlichen, dem die personenbezogenen
      Daten bereitgestellt wurden, zu übermitteln, sofern
    </p>
    <ol class="mb-2 list-inside list-decimal">
      <li>
        die Verarbeitung auf einer Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO oder Art. 9 Abs. 2 lit. a DSGVO oder auf
        einem Vertrag gem. Art. 6 Abs. 1 lit. b DSGVO beruht und
      </li>
      <li>die Verarbeitung mithilfe automatisierter Verfahren erfolgt.</li>
    </ol>
    <p class="mb-2">
      In Ausübung dieses Rechts haben Sie ferner das Recht, zu erwirken, dass die Sie betreffenden personenbezogenen
      Daten direkt von einem Verantwortlichen einem anderen Verantwortlichen übermittelt werden, soweit dies technisch
      machbar ist. Freiheiten und Rechte anderer Personen dürfen hierdurch nicht beeinträchtigt werden.
    </p>
    <p class="mb-2">
      Das Recht auf Datenübertragbarkeit gilt nicht für eine Verarbeitung personenbezogener Daten, die für die
      Wahrnehmung einer Aufgabe erforderlich ist, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher
      Gewalt erfolgt, die dem Verantwortlichen übertragen wurde.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">8.7 Widerspruchsrecht</h3>
    <p class="mb-2">
      Sie haben das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die
      Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO
      erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling.
    </p>
    <p class="mb-2">
      Der Verantwortliche verarbeitet die Sie betreffenden personenbezogenen Daten nicht mehr, es sei denn, er kann
      zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten
      überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
    </p>
    <p class="mb-2">
      Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das
      Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke
      derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung
      steht.
    </p>
    <p class="mb-2">
      Widersprechen Sie der Verarbeitung für Zwecke der Direktwerbung, so werden die Sie betreffenden personenbezogenen
      Daten nicht mehr für diese Zwecke verarbeitet.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">
      8.8 Recht auf Widerruf der datenschutzrechtlichen Einwilligungserklärung
    </h3>
    <p class="mb-2">
      Sie haben das Recht, Ihre datenschutzrechtliche Einwilligungserklärung jederzeit zu widerrufen. Durch den Widerruf
      der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung
      nicht berührt.
    </p>

    <h3 class="mb-2 mt-4 text-base font-semibold">8.9 Recht auf Beschwerde bei einer Aufsichtsbehörde</h3>
    <p class="mb-2">
      Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf
      Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts, ihres
      Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, zu, wenn Sie der Ansicht sind, dass die Verarbeitung der
      Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.
    </p>
    <p class="mb-2">
      Die Aufsichtsbehörde, bei der die Beschwerde eingereicht wurde, unterrichtet den Beschwerdeführer über den Stand
      und die Ergebnisse der Beschwerde einschließlich der Möglichkeit eines gerichtlichen Rechtsbehelfs nach Art. 78
      DSGVO.
    </p>
  </section>

  <section class="mb-6">
    <h2 class="mb-2 text-lg font-semibold">9. Änderung unserer Datenschutzbestimmungen</h2>
    <p class="mb-2">
      Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen
      Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei
      der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
    </p>
  </section>

  <section class="mb-6">
    <h2 class="mb-2 text-lg font-semibold">10. Fragen an den Datenschutzbeauftragten</h2>
    <p class="mb-2">
      Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die für
      den Datenschutz verantwortliche Person in unserer Organisation:
    </p>
    <div class="rounded bg-neutral p-2">
      <p>Nils Fischer</p>
      <a class="link-hover link text-secondary" href="mailto:{adminMail}">{adminMail}</a>
    </div>
  </section>

  <p class="mt-4 text-xs text-base-content/70">Stand: {new Date().toLocaleDateString("uk-Uk")}</p>
</div>
