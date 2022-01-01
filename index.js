"use strict";
/**************************************************************
USER EDITABLE AREA
*****************************************************************/
// class SortableTable {
// 		tableClass = 'testClass',
// 		sortedHeaderAsc = '',
//     sortedHeaderDesc = '',
// 		sortedCellsAsc = '',
//     sortedCellsDesc = ''
// };
/**************************************************************
END
*****************************************************************/
const sortableTables = document.querySelectorAll('.sortable'), cellArray = [];
if (sortableTables.length) {
    sortableTables.forEach(table => {
        const headers = Array.from(table.querySelectorAll('thead th'));
        headers.forEach((header, headerIndex) => {
            header.addEventListener('click', () => {
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach((row, index) => {
                    const cell = Array.from(row.querySelectorAll('td')).filter((e, index) => index == headerIndex).pop(), sortItem = { cellText: cell.innerHTML, rowElement: row };
                    cellArray.push(sortItem);
                });
                cellArray.sort(function (a, b) {
                    if (isNumeric(a.cellText)) {
                        return parseInt(a.cellText) - parseInt(b.cellText);
                    }
                    else {
                        return a.cellText > b.cellText ? 1 : -1;
                    }
                });
                const tb = table.querySelector('tbody');
                if (tb) {
                    tb.innerHTML = "";
                    cellArray.forEach(element => {
                        tb.append(element.rowElement);
                    });
                }
            });
        });
    });
}
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
