
function timetable() {   
          
    function selection(...attrSelection) {
        const tabbed = document.querySelectorAll('.tabbed'); // div class timetable
        
        function filterValue(evt, i, item) {
        
            item.querySelectorAll('.tabs input').forEach(inputTab => {
                inputTab.addEventListener(evt, (e) => {
            
                const input = tabbed[i].querySelectorAll('.checked input');
                    // input.forEach(attr => {
                        const filter = e.target.value.toUpperCase();
                        const selection = attrSelection[0][e.target.attributes[2].name.replaceAll('-', '')];
                        const tableRows = tabbed[i].querySelectorAll('.checked .table-row');
                        let totalRowF = [];
                        for (let ir = 0; ir < tableRows.length; ir++) {
                            const div = tableRows[ir].querySelector(`${selection}`);

                            const checkWord = () => {
                                const txtValue = div.textContent;
                                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                    tableRows[ir].style.display = '';
                                    totalRowF.push(1);
                                    div.classList.remove('error');
                                } else {
                                    tableRows[ir].style.display = 'none';
                                    div.classList.add('error');
                                }
                            };
                            
                            if(tableRows[ir].style.display != 'none') {
                                if(div){
                                    checkWord();
                                }
                            } else if (div.classList.contains('error')) {
                                if(div){
                                    checkWord();   
                                }
                            }
                        
                        }

                        let t = document.querySelector('.checked .totalSearch');
                        t.innerText = totalRowF.length > 0 ? `отобрано: ${totalRowF.length} эл.` : "нет элементов"; 
                        t.classList.add('showSearch');
                        t.style.display = 'block';
                    // });  
                });
            });
            
        }

        tabbed.forEach((item, i) => {
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

          selection({
              dataorganization: '[data-label="Организация: "]',
              dataplace: '[data-label="Площадка: "]',
              dataaddressorg: '[data-label="Адрес объекта: "]',
              datacoach: '[data-label="Тренер: "]',
              datagroup: '[data-label="Группа: "]',
              dataaddressgroup: '[data-label="Адрес: "]'
          });
        //   selection(allCoachs, );
        //   selection(allGroups, );
        //   selection(allAdressGroup, );
        //   selection(allAdressOrg, );
        //   selection(allOrganization, );
        //   selection(allPlace, );


          document.querySelectorAll('.tabs .responsive-table').forEach(table => {
            const t = document.createElement('div');
            t.setAttribute('class', 'totalSearch');
            table.append(t);
          });
          

    
    
}

export default timetable;