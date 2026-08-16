<!-- content_id: spanish-practice-loop | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | source_revision: worktree-2026-08-16 -->

# スペイン語の小さな練習：コピーできる6通のメッセージ

任意のテキスト LLM で、架空のホテル到着を四ターン練習します。流暢さ、学習速度、訂正の正確さは約束しません。架空の情報だけを使い、実名、予約、パスポート、住所、連絡先、支払いを求められたら止めます。

## 1. 目標
```text
Quiero practicar una llegada al hotel en español con datos ficticios. Ayúdame a elegir una meta escrita de cuatro turnos, una ayuda permitida y una forma visible de comprobarla. No escribas un diálogo, no evalúes mi nivel y no prometas fluidez.
```
## 2. 最初の試行
```text
Haz la situación ficticia de hotel acordada. Eres la persona de recepción y haces una pregunta corta cada vez. Espera mi respuesta. No traduzcas, no des una respuesta modelo y guarda mi primer intento.
```
## 3. 一つの不足
```text
Compara mi intento con esta comprobación: cuatro turnos, nombre y estancia comunicados, servicio pedido y una duda resuelta. Señala como máximo un problema que impida entenderme. Si no estás seguro, di «desconocido». No reescribas mi respuesta ni la llames fluida.
```
## 4. 自分で修正
```text
Para ese único problema, dame una pista parcial y espera mi propia revisión. No escribas una frase completa salvo que yo diga que la pista no basta. Conserva separados mi intento y mi revisión, y anota qué ayuda usé.
```
## 5. 場面を変える
```text
Mantén la misma meta de cuatro turnos, pero cambia a una estación: necesito un billete sencillo a Toledo para mañana y debo aclarar 8:15 u 8:50. No reutilices mis frases, no des pistas y guarda mi respuesta sin ayuda.
```
## 6. 後で確認
```text
En la fecha posterior que yo indique, crea una situación ficticia nueva de cuatro turnos con la misma comprobación. No la muestres antes, no digas que programaste un recordatorio y no infieras retención permanente. Registra fecha, intento, ayuda y lo que sigue sin observarse.
```

目標、最初の試行、支援、修正版、変更後のタスク、不明点を保存します。一回のループは記録された練習であり、習得や独立評価ではありません。
