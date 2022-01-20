const configureTable: ISortableTable  = {
  /**************************************************************
   USER EDITABLE AREA
   *****************************************************************/
  tableClasses: ["", "", ""], // Any classes you'd like every sortable table to have MUST BE an Array of strings! 

  noSortClass: "", // Custom class for making a column unsortable (Default is "no-sort")
  
  // IMPORTANT BOTH CLASSES NEED TO BE POPULATED FOR THE CLASSES TO BE ADDED
  ascendingIconClass: "sort-asc", // A single class added to clicked table header for ascending sort (Can be used for Icons etc)
  descendingIconClass: "sort-desc" // A single class added to clicked table header for descending sort (Can be used for Icons etc)
  /**************************************************************
   END
   *****************************************************************/ 
}

interface sortableItem {
  cellText: string,
  rowElement: HTMLTableCellElement
}

interface ISortableTable {
  tableClasses: string[],
  noSortClass: string,
  ascendingIconClass: string,
  descendingIconClass: string,
}

const sortableTables = document.querySelectorAll('.sortable') as NodeListOf<HTMLTableElement>;

if (sortableTables.length) {
  sortableTables.forEach(table => {
    const headers = Array.from(table.querySelectorAll('thead th') as NodeListOf<HTMLTableCellElement>);
    const rows = table.querySelectorAll('tbody tr') as NodeListOf<HTMLTableCellElement>;

    configureTable.tableClasses.filter(cls => cls != "").length ? table.classList.add(...configureTable.tableClasses): false;
    
    headers.forEach((header, headerIndex) => {
      if(!header.classList.contains(configureTable.noSortClass != "" ? configureTable.noSortClass : 'no-sort')) {
        header.addEventListener('click', () => {
        let filteredArray = [] as  Array<sortableItem>,
            filterDirection = 'asc';

        rows.forEach((row, index) => {
          const cell = Array.from(row.querySelectorAll('td') as NodeListOf<HTMLTableCellElement>).filter((e, index) => index == headerIndex).pop() as HTMLTableCellElement,
              sortItem: sortableItem = {cellText: cell.innerHTML, rowElement: row};
          filteredArray.push(sortItem);
        });
        
        if(!header.classList.contains('filtered')){
          headers.forEach(el =>  {
            el.classList.remove('filtered');
            if(configureTable.ascendingIconClass && configureTable.descendingIconClass) {
              el.classList.remove(configureTable.ascendingIconClass, configureTable.descendingIconClass);
            }
            el.removeAttribute('data-sort-direction');
          });
          header.classList.add('filtered');
        }
        
        if(header.getAttribute('data-sort-direction') != SortDirection.Ascending) {
          filterDirection = SortDirection.Ascending;
          header.setAttribute('data-sort-direction',SortDirection.Ascending); 
          sortCells(filteredArray, rows, headerIndex, filterDirection);
        } else {
          filterDirection = SortDirection.Descending;
          header.setAttribute('data-sort-direction',SortDirection.Descending);
          sortCells(filteredArray, rows, headerIndex, filterDirection);
        }
         
        if (configureTable.ascendingIconClass != '' && configureTable.descendingIconClass != '') {
          header.classList.remove(filterDirection == SortDirection.Ascending ? configureTable.descendingIconClass : configureTable.ascendingIconClass);
          header.classList.add(filterDirection == SortDirection.Ascending ? configureTable.ascendingIconClass : configureTable.descendingIconClass);
        }
        
        
        const tb = table.querySelector('tbody');
        
        if(tb){
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


enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc'
}
