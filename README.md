# DT208g - Moment 4 - Angular II
## Moderkomponenten (startsidan)
När sidan öppnas hämtas information från en extern JSON-fil med hjälp av en service som använder HttpClient. Den lagras i två stycken `Array<Course>` en för original och den andra för display. Anledningen till att det blev två stycken var att man skulle kunna återgå till original arrayen, men det gick inte av någon anledning att "skriva över" display arrayen. Därför finns det en random metod istället.
## Listans "kontroller"
Det är en komponent som hanterar sökfältet och de tre sorteringsknapparna.
### Sökfältet
Vid inmatning skickas värdet till moderkomponenten med hjälp av `@Output` och en `EventEmitter<string>`. I moderkomponenten filtreras listan efter antingen kurskod eller kursnamn, versaler spelar ingen roll.
### Sorteringsknapparna
Knapparna har tre olika lägen: `random`, `ascending` och `descending`. Vid klick ändras de olika lägena, vad som står är det nuvarande läget. Om det står "Stegande" för kursnamn, då är kursnamnen sorterad från A till Ö.
Samma som med sökfältet, men knapparna använder `EventEmitter<Sort>` där Sort är ett interface med egenskaperna `columnName: string;` och `state: number;`. Den förstnämnda anger vilket fält som ska sorteras och den andra säger hur.
I moderkomponenten utförs sorteringen: `0` är `random`, `1` är `ascending` och `2` är `descending`. Jag visste inte hur jag skulle göra sorteringen på ett bättre sätt, så det blev nästlade switch-satser. En huvud switch för vilken kolumn och en sub switch för typen av sortering.
## Listan
En komponent som tar emot den filtrerade/sorterade listan (eller original listan). Ett event för att öppna en sida i ny flik finns.
