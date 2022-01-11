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
const sortableTables = document.querySelectorAll('.sortable');
if (sortableTables.length) {
    sortableTables.forEach(table => {
        const headers = Array.from(table.querySelectorAll('thead th'));
        const rows = table.querySelectorAll('tbody tr');
        headers.forEach((header, headerIndex) => {
            header.addEventListener('click', () => {
                let filteredArray = [];
                rows.forEach((row, index) => {
                    const cell = Array.from(row.querySelectorAll('td')).filter((e, index) => index == headerIndex).pop(), sortItem = { cellText: cell.innerHTML, rowElement: row };
                    filteredArray.push(sortItem);
                });
                if (!header.classList.contains('filtered')) {
                    headers.forEach(el => el.classList.remove('filtered', 'ascending', 'descending'));
                    header.classList.add('filtered');
                }
                if (!header.classList.contains('ascending')) {
                    header.classList.remove('descending');
                    header.classList.add('ascending');
                    sortCells(filteredArray, rows, headerIndex, "asc");
                }
                else {
                    header.classList.remove('ascending');
                    header.classList.add('descending');
                    sortCells(filteredArray, rows, headerIndex, "desc");
                }
                const tb = table.querySelector('tbody');
                if (tb) {
                    tb.innerHTML = "";
                    filteredArray.forEach(element => {
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
function sortCells(cellArray, rows, headerIndex, direction) {
    cellArray.sort(function (a, b) {
        if (direction == "asc") {
            if (isNumeric(a.cellText)) {
                return Math.ceil(parseInt(a.cellText)) - Math.ceil(parseInt(b.cellText));
            }
            else {
                return a.cellText > b.cellText ? 1 : -1;
            }
        }
        else {
            if (isNumeric(a.cellText)) {
                return Math.ceil(parseInt(b.cellText)) - Math.ceil(parseInt(a.cellText));
            }
            else {
                return a.cellText > b.cellText ? -1 : 1;
            }
        }
    });
}
