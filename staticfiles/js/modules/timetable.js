
function timetable() {   
          
    function selection(array, attrSelection) {
        const tabbed = document.querySelectorAll('.tabbed'); // div class timetable
        
        function filterValue(evt, i, item) {
            item.addEventListener(evt, (e) => {
               
                const filter = e.target.value.toUpperCase();
                const tableRows = tabbed[i].querySelectorAll('.checked .table-row');
                let totalRowF = [];
                for (let ir = 0; ir < tableRows.length; ir++) {
                    const div = tableRows[ir].querySelector(attrSelection);
                    if(div){
                        const txtValue = div.textContent;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            tableRows[ir].style.display = '';
                            totalRowF.push(1);
                        } else {
                            tableRows[ir].style.display = 'none';
                        }   
                    }
                }
                
                let t = document.querySelector('.checked .totalSearch');
                t.innerText = totalRowF.length > 0 ? `отобрано: ${totalRowF.length} эл.` : "нет элементов"; 
                t.classList.add('showSearch');
                t.style.display = 'block';
            });
        }

        array.forEach((item, i) => {
            ['input'].forEach(evt => {
                filterValue(evt, i, item);
            });
        });
        
    }
       

    const allCoachs = document.querySelectorAll('[data-coach]'), // input with attr for selection
          allGroups = document.querySelectorAll('[data-group]'),
          allAdressGroup = document.querySelectorAll('[data-address-group]'),
          allAdressOrg = document.querySelectorAll('[data-address-org]'),
          allOrganization = document.querySelectorAll('[data-organization]'),
          allPlace = document.querySelectorAll('[data-place]');

          selection(allCoachs, '[data-label="Тренер: "]');
          selection(allGroups, '[data-label="Группа: "]');
          selection(allAdressGroup, '[data-label="Адрес: "]');
          selection(allAdressOrg, '[data-label="Адрес объекта: "]');
          selection(allOrganization, '[data-label="Организация: "]');
          selection(allPlace, '[data-label="Площадка: "]');


          document.querySelectorAll('.tabs .responsive-table').forEach(table => {
            const t = document.createElement('div');
            t.setAttribute('class', 'totalSearch');
            table.append(t);
          });
          

    
    
}

export default timetable;