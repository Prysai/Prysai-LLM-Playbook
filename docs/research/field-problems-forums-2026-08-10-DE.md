<!-- content_id: field-problems-forums-2026-08-10 | locale: DE | language: de | default_locale: EN | translation_status: in-progress | translated_from: field-problems-forums-2026-08-10.md | source_revision: 2026-08-23 -->

# Reale Probleme der Codex-/KI-Coding-Agent-Oberflächen: Forum- und öffentliche-Issue-Recherche

**Recherchetag:** 2026-08-10  
**Status:** `candidate` (Quellen besucht und geordnet; keine lokale Reproduktion, keine Forumsantwort als offizielle Aussage behandelt)  
**Umfang:** Berechtigungen, Windows, VS Code, Sandbox-Netzwerk und Verzeichniszugriff.  
**Ausführungsgrenze:** Nur-Lese-Zugriff auf Stack Exchange API, Stack-Overflow-Links und öffentliche `openai/codex`-Issues; keine Befehle aus Beiträgen ausgeführt, keine Geheimnisse gelesen, kein Commit oder Push.

## So werden die Einträge gelesen

- **Nutzerbericht:** Umgebung, Symptom oder Reproduktionsbericht des Autors.
- **Antwortvorschlag:** Community-Workaround, keine Produktzusage.
- **Offizielle Bestätigung:** Offizielle Dokumentation, ausdrückliche Maintainer-Antwort oder offizieller Code/Release-Hinweis. Ein gewöhnlicher Issue-Autor zählt nicht.
- **Lokale Reproduktion:** In dieser Recherche keine ausgeführt.
- **Vermutung:** Einschätzung des Autors oder Antwortenden zur Ursache; Unsicherheit bleibt erhalten.

Zeitstempel stammen von den Quellseiten. Die Datei sagt nur, dass die Quellen am 2026-08-10 erreichbar waren; sie bildet daraus keine lokal geprüfte Zeitlinie.

## Lehrbare Fälle

### 1. GitHub-Zugriff im Sandbox durch Netzwerk-Allowlist blockiert

- **Quelle:** [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox)
- **Symptom:** Codex CLI mit `sandbox_mode = "workspace-write"`; `curl -I https://github.com` scheitert mit einem Proxyfehler wie `blocked-by-allowlist`.
- **Grenze:** Nutzerbericht, Antworten und Vermutung; keine lokale oder offizielle Bestätigung.
- **Sichere Lehre:** Sandbox-Netzverbot, Proxy-Allowlist, DNS/TLS und Unternehmensfirewall trennen; URL, HTTP-Status, Proxyfehler und effektive Berechtigung notieren; nur die nötige Domain ohne Geheimnis testen.
- **Nicht behaupten:** `workspace-write` bringe Internet, Netzwerkfreigabe verbinde jedes CLI, eine Antwortkonfiguration sei aktuelle Syntax oder full access sei ein vertretbarer Approval-Bypass.

### 2. Windows: Ist native Codex-CLI-Unterstützung belegt?

- **Quelle:** [Stack Overflow #79887792](https://stackoverflow.com/questions/79887792/openai-codex-cli-isnt-available-on-windows-yet-is-there-any-other-way-i-can-hav)
- **Symptom:** Windows 11, PowerShell/Command Prompt, WSL2; Dokumentation trennt fehlenden Support nicht klar von fehlender Anleitung.
- **Grenze:** Widersprüchliche Community-Vorschläge (WSL2 oder natives Windows), ohne offizielle Bestätigung oder Reproduktion.
- **Sichere Lehre:** Version, Installationsquelle, `where`/PATH, Shell, WSL-Distribution und Dateisystem des Projekts protokollieren; mit Versionsprüfung und Nur-Lese-Sonde beginnen.
- **Nicht behaupten:** nativen Support oder Gleichheit zwischen WSL2 und Windows.

### 3. VS-Code-Erweiterung `spawn UNKNOWN`, CLI startet manuell

- **Quelle:** [Stack Overflow #79923404](https://stackoverflow.com/questions/79923404/vs-code-codex-extension-fails-with-spawn-unknown-on-windows-even-though-codex)
- **Symptom:** Verwaltetes Windows, VS Code stable und PowerShell Constrained Language Mode; CLI läuft, Extension Host meldet `spawn UNKNOWN`.
- **Sichere Lehre:** VS-Code-, Erweiterungs- und CLI-Version, `where.exe`, Extension-Host-Logs, Shell-Policy und `.exe`/`.cmd`-Shim getrennt erfassen. CLI-Start und Extension-spawn sind zwei Abnahmepunkte.
- **Nicht behaupten:** korrektes PATH = funktionierende Erweiterung, eine einzige PATH-Ursache oder das Recht, Unternehmensrichtlinien zu umgehen.

### 4. `approval_policy = "on-failure"` fragt weiterhin jede Datei ab

- **Quelle:** [Stack Overflow #79891423](https://stackoverflow.com/questions/79891423/how-to-stop-codex-from-always-asking-for-approval)
- **Symptom/Grenze:** VS Code, Windows/WSL, workspace trusted; jede Änderung verlangt Freigabe. Die akzeptierte Antwort nutzt eine andere Version und Umgebung.
- **Sichere Lehre:** „fragt nach“ und „Sandbox erlaubt“ trennen; effektiven Konfigurationsort, Session, Workspace und writable roots prüfen; kleine reversible Änderung testen.
- **Nicht behaupten:** `never` sei Vollzugriff oder workspace-write erlaube alle Dateien.

### 5. Unlesbare Zeichen in Windows Terminal

- **Quelle:** [Stack Overflow #79880150](https://stackoverflow.com/questions/79880150/gibberish-symbols-in-codex-under-windows-cmd-in-windows-terminal)
- **Symptom:** Zusätzliche Zeichen verschwinden nach dem Resize des Fensters vorübergehend.
- **Sichere Lehre:** Terminal, Shell, Schrift, Größe, Codepage und Version notieren; neues Fenster, Redraw, andere Terminals und Textausgabe vergleichen.
- **Nicht behaupten:** `chcp 65001` repariere immer, die Ursache sei sicher UTF-8 oder Resize sei dauerhaft.

### 6. Sandbox soll das Lesen eines privaten Verzeichnisses verhindern

- **Quelle:** [Stack Overflow #79959031](https://stackoverflow.com/questions/79959031/how-to-prevent-codex-cli-from-reading-certain-files-or-directories-via-sandbox)
- **Symptom:** Codex CLI, Linux-Beispiel `~/private`; gewünscht ist eine kernel-erzwungene Lesesperre statt einer Modellanweisung.
- **Sichere Lehre:** Betriebssystemberechtigungen nutzen und private Daten aus dem Workspace nehmen; Profile, absolute Pfade, cwd, writable roots und Helper mit einer nicht sensiblen Datei prüfen.
- **Nicht behaupten:** gleiche deny-Regeln auf allen Plattformen, Schutz vor jedem Exfiltrationsweg oder Kernelbeleg, weil ein Modell sagt, es könne nicht lesen.

### 7. Maven-Abhängigkeit kann nicht heruntergeladen werden

- **Quelle:** [Stack Overflow #79636395](https://stackoverflow.com/questions/79636395/codex-unable-to-access-java-maven-repository)
- **Symptom:** Java/Spring Boot, `./mvnw clean test`, `Network is unreachable`, danach Kaskade fehlender Versionen.
- **Sichere Lehre:** Netzwerkfehler von POM/Version trennen; Maven-Settings, Proxy, Ziel-Domain und Cache protokollieren; genehmigten Proxy oder vorbereiteten Dependency-Cache nutzen.
- **Nicht behaupten:** unbekannten öffentlichen Proxy empfehlen oder OpenAI-Zugriff als Maven-Central-, GitHub- oder Universalzugriff werten.

### 8. Windows Computer Use kann Fenster nicht aufzählen

- **Quelle:** [openai/codex Issue #37306](https://github.com/openai/codex/issues/37306)
- **Symptom/Grenze:** `EnumWindows failed`; ein öffentliches Bug-Label ist keine Maintainer-Bestätigung.
- **Sichere Lehre:** normale Anwendungen testen, dann Fenster-API, Helper-Pfad/Installation und Berechtigung/aktiven Desktop trennen; Fehlercode und Versuche behalten.
- **Nicht behaupten:** allgemeine Verfügbarkeit oder validierte Kontrolle, nur weil der Helper startet.

### 9. Kurzes Command-Prompt-Fenster während Windows Desktop

- **Quelle:** [openai/codex Issue #37153](https://github.com/openai/codex/issues/37153)
- **Symptom:** Vordergrund-Console und `conhost.exe`-Kindprozess; Nutzer vermutet unautorisierte Aktivität.
- **Sichere Lehre:** Prozessbaum, Pfade, Signaturen, Zeitpunkt und Version erfassen, Leerlauf und Ausführung vergleichen und bei Bedarf ein minimales Feedbackpaket ohne Quelltext/Secrets senden.
- **Nicht behaupten:** Exfiltration oder Malware aus einem einzelnen Fenster, oder Alpha-Verhalten für alle Desktop-Versionen.

### 10. Widersprüchlicher Hinweis bei eigenem writable root und cwd

- **Quelle:** [openai/codex Issue #37655](https://github.com/openai/codex/issues/37655)
- **Symptom:** Erzeugter Text nennt cwd editierbar, aber `apply_patch` verlangt Freigabe, während nur ein anderer Root writable ist.
- **Sichere Lehre:** reale Ablehnung/Freigabe als Maßstab nehmen; cwd, roots, effektives Profil, erzeugten Prompt und Ziel notieren; Ziele in cwd, erlaubtem Root und außerhalb testen.
- **Nicht behaupten:** Berechtigungstext = OS-Enforcement, `workspace-write` mache cwd sicher schreibbar oder Fix ohne Versionscode/-tests.

## Gemeinsame minimale Prüfkarte

1. Prompt, Approval-Policy, Sandbox-Enforcement, OS-Berechtigungen, Netzwerk-Proxy und Zieltool trennen.
2. Version, Plattform, Installationsquelle, Shell/Terminal, cwd, aktive Konfiguration, genauen Fehler, Prozessbaum und URL sammeln.
3. Geheimnisfreie, reversible Ein-Datei- oder Ein-Domain-Tests ausführen; Forumsskripte, Proxy- oder Berechtigungserweiterungen nicht direkt übernehmen.
4. Effektive Konfiguration prüfen: Die editierte Datei muss nicht die der laufenden Session, Erweiterung oder App sein.
5. Start, Lesen, Schreiben, Netzwerk, VS-Code-Integration und Computer-Use-Steuerung getrennt abnehmen.

## Quellen-, Lizenz- und Nutzungsgrenze

Stack Overflow kennzeichnet CC BY-SA 4.0; dieser Eintrag fasst nur zusammen und verlinkt, ohne lange Passagen, Code oder Antworten zu kopieren. GitHub-Issues sind öffentliche Nutzerberichte, keine OpenAI-Bestätigung. Keine externen Bilder, Codes oder Skill-Anweisungen wurden kopiert; kein neuer Asset-Eintrag ist nötig.

## Blockaden und ungeprüfte Punkte

- Offizielle Codex-URLs leiteten in dieser Runde um; der endgültige Text konnte nicht zuverlässig gelesen und wird nicht als bestätigt dargestellt.
- Die GitHub-REST-API begrenzte weitere Detail-/Kommentarabfragen anonym; verwendet werden nur erreichbare Seiten, Suchergebnisse und erhaltene Zusammenfassungen.
- Reddit, GitHub Discussions und nicht zuverlässig zitierbare Seiten sind ausgeschlossen.
- Kein Forumsproblem wurde lokal reproduziert; alle bleiben nicht verifiziert.
- Forumstexte, Versionen, Konfigurationssyntax und Supportmatrix ändern sich; vor Veröffentlichung URLs, Primärquelle, Datum und Versionsumfang neu prüfen.
