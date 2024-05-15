document.addEventListener("DOMContentLoaded", function() {
    const kataYangDicari = ['CANVAS', 'CODE', 'FUN', 'FUNCTION', 'GAMES', 'JAVASCRIPT', 'KIDS', 'PLAY', 'SHARE', 'VARIABLE'];
    const puzzle = [
        ['J', 'Q', 'V', 'N', 'R', 'G', 'N', 'T', 'U', 'I'], 
        ['V', 'L', 'A', 'O', 'S', 'A', 'X', 'P', 'S', 'C'], 
        ['W', 'P', 'R', 'I', 'D', 'M', 'E', 'I', 'I', 'T'], 
        ['K', 'P', 'I', 'T', 'I', 'E', 'T', 'R', 'H', 'K'],  
        ['Z', 'U', 'A', 'C', 'K', 'S', 'G', 'C', 'X', 'T'],  
        ['X', 'T', 'B', 'N', 'F', 'Z', 'Y', 'S', 'G', 'J'],  
        ['O', 'D', 'L', 'U', 'Y', 'U', 'H', 'A', 'H', 'N'],  
        ['A', 'F', 'E', 'F', 'C', 'A', 'N', 'V', 'A', 'S'],  
        ['E', 'D', 'O', 'C', 'R', 'P', 'L', 'A', 'Y', 'A'],  
        ['F', 'X', 'E', 'E', 'V', 'C', 'P', 'J', 'H', 'B']
    ];

    const directions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 1 },
        { x: -1, y: -1 },
        { x: 1, y: -1 },
        { x: -1, y: 1 }
    ];

    function cariKata(kata) {
        for (let baris = 0; baris < puzzle.length; baris++) {
            for (let kolom = 0; kolom < puzzle[baris].length; kolom++) {
                if (puzzle[baris][kolom] === kata[0]) {
                    for (const arah of directions) {
                        let ditemukan = true;
                        let jalur = [{baris, kolom}];
                        for (let i = 1; i < kata.length; i++) {
                            const barisBaru = baris + i * arah.y;
                            const kolomBaru = kolom + i * arah.x;
                            if (
                                barisBaru < 0 || barisBaru >= puzzle.length ||
                                kolomBaru < 0 || kolomBaru >= puzzle[baris].length ||
                                puzzle[barisBaru][kolomBaru] !== kata[i]
                            ) {
                                ditemukan = false;
                                break;
                            }
                            jalur.push({baris: barisBaru, kolom: kolomBaru});
                        }
                        if (ditemukan) {
                            return { kata, mulai: [baris, kolom], arah, jalur };
                        }
                    }
                }
            }
        }
        return null;
    }

    function tampilkanHasil() {
        const hasilDiv = document.getElementById("results");
        hasilDiv.innerHTML = "";
        const kataDitemukan = kataYangDicari.map(kata => cariKata(kata)).filter(hasil => hasil !== null);

        kataDitemukan.forEach(hasil => {
            hasilDiv.innerHTML += `Ditemukan kata "${hasil.kata}" mulai di (${hasil.mulai[0]}, ${hasil.mulai[1]}) bergerak ke arah (${hasil.arah.x}, ${hasil.arah.y})\n`;
        });

        tandaiKata(kataDitemukan);
    }

    function tandaiKata(kataDitemukan) {
        kataDitemukan.forEach((hasil, indeks) => {
            const kelasTandai = `tandai-${indeks}`;
            const warnaTandai = generateRandomColor();
            
            const style = document.createElement('style');
            style.textContent = `.${kelasTandai} { background-color: ${warnaTandai}; }`;
            document.head.appendChild(style);
    
            hasil.jalur.forEach(cell => {
                const cellElement = document.getElementById(`cell-${cell.baris}-${cell.kolom}`);
                cellElement.classList.add(kelasTandai);
            });
        });
    }
    
    function generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0 ; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }        

    function gambarGrid() {
        const beforeDiv = document.getElementById("beforeGrid");
        let tableHTML = "<table>";
        puzzle.forEach((baris, indeksBaris) => {
            tableHTML += "<tr>";
            baris.forEach((kotak, indeksKolom) => {
                tableHTML += `<td id="cell-${indeksBaris}-${indeksKolom}">${kotak}</td>`;
            });
            tableHTML += "</tr>";
        });
        tableHTML += "</table>";
        beforeDiv.innerHTML = tableHTML;
    }

    gambarGrid();
    tampilkanHasil();
});
