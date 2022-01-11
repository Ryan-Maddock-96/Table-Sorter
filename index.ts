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

const sortableTables = document.querySelectorAll('.sortable') as NodeListOf<HTMLTableElement>;

if (sortableTables.length) {
  sortableTables.forEach(table => {
    const headers = Array.from(table.querySelectorAll('thead th') as NodeListOf<HTMLTableCellElement>);
    const rows = table.querySelectorAll('tbody tr') as NodeListOf<HTMLTableCellElement>;
    
    headers.forEach((header, headerIndex) => {
      
      header.addEventListener('click', () => {

        let filteredArray = [] as  Array<sortableItem>;

        rows.forEach((row, index) => {
          const cell = Array.from(row.querySelectorAll('td') as NodeListOf<HTMLTableCellElement>).filter((e, index) => index == headerIndex).pop() as HTMLTableCellElement,
              sortItem: sortableItem = {cellText: cell.innerHTML, rowElement: row};
          filteredArray.push(sortItem);
        });


        if(!header.classList.contains('filtered')){
          headers.forEach(el => el.classList.remove('filtered', 'ascending', 'descending'));
          header.classList.add('filtered');
        }
        
        if(!header.classList.contains('ascending')) {
          header.classList.remove('descending');
          header.classList.add('ascending');
          sortCells(filteredArray, rows, headerIndex, "asc");
        } else {
          header.classList.remove('ascending');
          header.classList.add('descending');
          sortCells(filteredArray, rows, headerIndex, "desc");
        }
        
        const tb = table.querySelector('tbody');
        if(tb){
          tb.innerHTML = "";
        
          filteredArray.forEach(element => {
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

function sortCells(cellArray: Array<sortableItem>, rows: NodeListOf<HTMLTableCellElement>, headerIndex: Number, direction: string) {
    cellArray.sort(function(a: sortableItem, b:sortableItem) {
      if(direction == "asc"){
        if (isNumeric(a.cellText)) {
          return parseInt(a.cellText) - parseInt(b.cellText);
        } else {
          return a.cellText > b.cellText ? 1 : -1;
        }
      } else {
        if (isNumeric(a.cellText)) {
          return parseInt(b.cellText) - parseInt(a.cellText);
        } else {
          return a.cellText > b.cellText ? -1 : 1;
        }
      }
      
    });
}
