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

interface sortableItem {
  cellText: string,
  rowElement: HTMLTableCellElement
}

const sortableTables = document.querySelectorAll('.sortable') as NodeListOf<HTMLTableElement>,
  cellArray = [] as  Array<sortableItem>;

if (sortableTables.length) {
  sortableTables.forEach(table => {
    const headers = Array.from(table.querySelectorAll('thead th') as NodeListOf<HTMLTableCellElement>);

    headers.forEach((header, headerIndex) => {
      header.addEventListener('click', () => {
        const rows = table.querySelectorAll('tbody tr') as NodeListOf<HTMLTableCellElement>;

        rows.forEach((row, index) => {
          const cell = Array.from(row.querySelectorAll('td') as NodeListOf<HTMLTableCellElement>).filter((e, index) => index == headerIndex).pop() as HTMLTableCellElement,
          sortItem: sortableItem = {cellText: cell.innerHTML, rowElement: row};
          cellArray.push(sortItem);
        });

        cellArray.sort(function(a: sortableItem, b:sortableItem){
          if(isNumeric(a.cellText)) {
              return parseInt(a.cellText) - parseInt(b.cellText);
          }else {
            return a.cellText > b.cellText ? 1 : -1;
          }

        });


        const tb = table.querySelector('tbody');
if(tb){
  tb.innerHTML = "";

  cellArray.forEach(element => {
    tb.append(element.rowElement);
  });
}

      });
    });

  });
}


function isNumeric(value:string) {
    return /^-?\d+$/.test(value);
}
