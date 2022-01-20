"use strict";
const configureTable = {
    /**************************************************************
     USER EDITABLE AREA
     *****************************************************************/
    tableClasses: ["", "", ""],
    noSortClass: "",
    // IMPORTANT BOTH CLASSES NEED TO BE POPULATED FOR THE CLASSES TO BE ADDED
    ascendingIconClass: "sort-asc",
    descendingIconClass: "sort-desc" // A single class added to clicked table header for descending sort (Can be used for Icons etc)
    /**************************************************************
     END
     *****************************************************************/
};
const sortableTables = document.querySelectorAll('.sortable');
if (sortableTables.length) {
    sortableTables.forEach(table => {
        const headers = Array.from(table.querySelectorAll('thead th'));
        const rows = table.querySelectorAll('tbody tr');
        configureTable.tableClasses.filter(cls => cls != "").length ? table.classList.add(...configureTable.tableClasses) : false;
        headers.forEach((header, headerIndex) => {
            if (!header.classList.contains(configureTable.noSortClass != "" ? configureTable.noSortClass : 'no-sort')) {
                header.addEventListener('click', () => {
                    let filteredArray = [], filterDirection = 'asc';
                    rows.forEach((row, index) => {
                        const cell = Array.from(row.querySelectorAll('td')).filter((e, index) => index == headerIndex).pop(), sortItem = { cellText: cell.innerHTML, rowElement: row };
                        filteredArray.push(sortItem);
                    });
                    if (!header.classList.contains('filtered')) {
                        headers.forEach(el => {
                            el.classList.remove('filtered');
                            if (configureTable.ascendingIconClass && configureTable.descendingIconClass) {
                                el.classList.remove(configureTable.ascendingIconClass, configureTable.descendingIconClass);
                            }
                            el.removeAttribute('data-sort-direction');
                        });
                        header.classList.add('filtered');
                    }
                    if (header.getAttribute('data-sort-direction') != SortDirection.Ascending) {
                        filterDirection = SortDirection.Ascending;
                        header.setAttribute('data-sort-direction', SortDirection.Ascending);
                        sortCells(filteredArray, rows, headerIndex, filterDirection);
                    }
                    else {
                        filterDirection = SortDirection.Descending;
                        header.setAttribute('data-sort-direction', SortDirection.Descending);
                        sortCells(filteredArray, rows, headerIndex, filterDirection);
                    }
                    if (configureTable.ascendingIconClass != '' && configureTable.descendingIconClass != '') {
                        header.classList.remove(filterDirection == SortDirection.Ascending ? configureTable.descendingIconClass : configureTable.ascendingIconClass);
                        header.classList.add(filterDirection == SortDirection.Ascending ? configureTable.ascendingIconClass : configureTable.descendingIconClass);
                    }
                    const tb = table.querySelector('tbody');
                    if (tb) {
                        tb.innerHTML = "";
                        filteredArray.forEach(element => {
                            tb.append(element.rowElement);
                        });
                    }
                });
            }
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
                return parseInt(a.cellText) - parseInt(b.cellText);
            }
            else {
                return a.cellText > b.cellText ? 1 : -1;
            }
        }
        else {
            if (isNumeric(a.cellText)) {
                return parseInt(b.cellText) - parseInt(a.cellText);
            }
            else {
                return a.cellText > b.cellText ? -1 : 1;
            }
        }
    });
}
var SortDirection;
(function (SortDirection) {
    SortDirection["Ascending"] = "asc";
    SortDirection["Descending"] = "desc";
})(SortDirection || (SortDirection = {}));
