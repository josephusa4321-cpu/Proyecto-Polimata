const fs = require('fs');
const path = 'c:/Users/Comercial 4/Desktop/Proyecto Polimata/src/components/StudyPanel.tsx';

try {
    const buffer = fs.readFileSync(path);
    const content = buffer.toString('utf-8');
    const isWin = content.includes('\r\n');
    const lines = content.split(isWin ? '\r\n' : '\n');

    const startIndex = 132; // Línea 133 (0-indexed)
    const endIndex = 193;   // Línea 194 (0-indexed)

    console.log("Línea 133:", lines[startIndex]);
    console.log("Línea 194:", lines[endIndex]);

    // Verificación
    if (lines[startIndex].includes('prose prose-invert') && lines[endIndex].trim() === '</div>') {
        
        // Reemplazar el inicio del bloque
        lines[startIndex] = `                            {showPracticeLab ? (
                                <div className="min-h-[200px] relative">
                                    <PracticeLabPanel cardId={card.id} />
                                </div>
                            ) : (
                                <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white prose-strong:text-primary max-w-none min-h-[200px] relative">`;
        
        lines[startIndex + 1] = ''; // vaciar {showPracticeLab ? (
        lines[startIndex + 2] = ''; // vaciar <PracticeLabPanel ...
        lines[startIndex + 3] = '                                    {isLoading ? ('; // Cambiar condicional
        
        // Reemplazar el fin del bloque
        lines[endIndex] = `                                </div>
                            )}`;
        
        fs.writeFileSync(path, lines.join(isWin ? '\r\n' : '\n'));
        console.log("ÉXITO: Estructura corregida.");
    } else {
        console.log("ERROR: Verificación de contenido fallida.");
    }
} catch (e) {
    console.log("ERROR ejcutando script:", e.message);
}
