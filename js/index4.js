
import {saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask} from './firebase.js'





// capturar el div del index
const taskContainer = document.getElementById('task-container')
const taskContainerInspUp = document.getElementById('task-container-up2');
const taskContainerInstUp = document.getElementById('task-container-upIstr');



// para saber si esta editando
let editStatus = false;
// guardamos el id para poder editar
let id ='';

// fin de agragad datos al index
window.addEventListener('DOMContentLoaded',  async() => {
    // const datafomDB = await getTask();
    onGetTasks( (datafomDB) => {
        let html ='';
    // para ver todos los doc por consola
    datafomDB.forEach(doc => {
    var datosLibreta =doc.data();
        html +=`
      <div >
      
      </br>
      <h3 class="h5">N° de libreta : ${datosLibreta.LibIdentificador}</h3>
      <p> Categoria de libreta : ${datosLibreta.LibCategoria}</p>
      <p>Nombre del conductor : ${datosLibreta.LibName}</p>
      <p>Cedula del conductor : ${datosLibreta.LibCedula}</p>
      <p>Vencimiento de la libreta : ${datosLibreta.LibVto}</p>
      <p>Observaciones de la libreta : ${datosLibreta.LibObservaciones}</p>
      <p>Puntos de la libreta : ${datosLibreta.LibPuntos}</p>
      <p>Libreta habilitada : ${datosLibreta.LibStatus}</p>
      <br/>
      <button class='btn-delete' data-id="${doc.id}">Borrar</button>
      <button class='btn-Edit' data-id="${doc.id}">Actualizar</button>
      <div>
      </div>
    </div>`;
        
        console.log(doc.data());
        initIMG();
    });
    // borar datos

    // ingresar los datos
    taskContainer.innerHTML += html;
    // selecionar todos los botnes delete para borrar
    const btnDelete = taskContainer.querySelectorAll('.btn-delete')
    btnDelete.forEach(btn =>{
         btn.addEventListener('click', ({target:{dataset}})=> {
            deleteTask(dataset.id)
        })
    })
    

    // funcion para editar
 const btnsEdit = taskContainer.querySelectorAll('.btn-Edit')
 btnsEdit.forEach((btn) => {
     btn.addEventListener('click', async(e) =>{
         const doc = await getTask(e.target.dataset.id)
         moverEditData();
         const  task = doc.data()
         taskForm['Lib-Id'].value = task.LibIdentificador
         taskForm['Lib-Cat'].value = task.LibCategoria
         taskForm['Lib-Name'].value = task.LibName
         taskForm['Lib-Ced'].value = task.LibCedula
         taskForm['Lib-Vto'].value = task.LibVto
         taskForm['Lib-Obser'].value = task.LibObservaciones
         taskForm['Lib-Ptos'].value = task.LibPuntos
         taskForm['Lib-State'].value = task.LibStatus


         editStatus = true;
         id = e.target.dataset.id;

         // cambiar valor de btm save a update
            taskForm['btn-task-form'].innerText = 'UPDATE';
     } )
 })
 
});
})


// guardar datos
const taskForm= document.getElementById('task-form');
taskForm.addEventListener('submit', (e) => {
     e.preventDefault()
    
   
    const LibIdentificador = document.getElementById("Lib-Id").value;
    const LibCategoria = document.getElementById('Lib-Cat').value;
     const LibName = document.getElementById('Lib-Name').value;
    const LibCedula = document.getElementById('Lib-Ced').value;
    const LibVto = document.getElementById('Lib-Vto').value;
    const LibObservaciones = document.getElementById('Lib-Obser').value;
    const LibPuntos = document.getElementById('Lib-Ptos').value;
    const LibStatus = document.getElementById('Lib-State').value;

    
    // concicion para ver si edita
     if (!editStatus){
       saveTask(LibIdentificador, LibCategoria, LibName, LibCedula, LibVto, LibObservaciones, LibPuntos, LibStatus);
    initIMG();
    moverGuarData();
    }else{ 
        updateTask(id, {LibIdentificador, LibCategoria, LibName, LibCedula, LibVto, LibObservaciones, LibPuntos, LibStatus})
        moverGuarData();
         editStatus = false;
    initIMG(); 
    }    
    initIMG();
    // resreto de datos de index.html
    taskForm.reset();
})

// mostar  imagenes 
function initIMG(){
    document.getElementById("IMGdata").style.display="block";
};




// buscar conductor Inspector funcionando
 const  taskInspectorForm = document.getElementById("task-inspector-form");
taskInspectorForm.addEventListener('submit', (e) => {
    e.preventDefault()
   
         console.log("buscando")
    
    const  IdBUsInsp =  document.getElementById('IdBUsInsp').value
    const IdBUsInspUPP = IdBUsInsp.toUpperCase();
    if(IdBUsInspUPP !=''){
        console.log("buscando conductor ...");
    console.log("Datos de libreta buscada : " +IdBUsInspUPP);
     clear();
     movelibselectInsp();
     
     onGetTasks( (datafomDB) => {
        let html4 ='';
        datafomDB.forEach(doc => { 
            const  taskWithMulta = doc.data()
            const PtosdeLibreta = taskWithMulta.LibPuntos;
            console.log('desde data '+taskWithMulta.LibIdentificador)
            if(taskWithMulta.LibIdentificador == IdBUsInsp){
                html4 +=`
                <div >
                </br>
                <h3 class="h5">N° de libreta : ${taskWithMulta.LibIdentificador}</h3>
                <p> Categoria de libreta : ${taskWithMulta.LibCategoria}</p>
                <p>Nombre del conductor : ${taskWithMulta.LibName}</p>
                <p>Cedula del conductor : ${taskWithMulta.LibCedula}</p>
                <p>Vencimiento de la libreta : ${taskWithMulta.LibVto}</p>
                <p>Observaciones de la libreta : ${taskWithMulta.LibObservaciones}</p>
                <p>Puntos de la libreta : ${taskWithMulta.LibPuntos}</p>
                <p>Libreta habilitada : ${taskWithMulta.LibStatus}</p>
                <br/>
                <button class='btn-delete BtnBuscar'  ">Libreta equivocada</button>
                <button class='btn-Edit BtnBuscar' data-id="${doc.id}">Sancionar</button>
                <div>
                </div>
              </div>`
              ;
              
                console.log('match')
                console.log(taskWithMulta)
                taskContainerInspUp.innerHTML += html4;
                 // selecionar todos los botnes delete para borrar
    const btnDelete2 = taskContainerInspUp.querySelectorAll('.btn-delete')
    btnDelete2.forEach(btn =>{
         btn.addEventListener('click', ({target:{dataset}})=> {
            taskContainerInspUp.innerHTML='';
        })
    })
        const btnEditInsp = taskContainerInspUp.querySelectorAll('.btn-Edit')
    btnEditInsp.forEach(btn =>{
         btn.addEventListener('click', ({target:{dataset}})=> {
           
            document.getElementById("SelectMultas").style.display="block";
            searchMulta();
            

        })
    })
    const SelectMultas2 = document.getElementById('Multas');
    
SelectMultas2.addEventListener('change', (e) => {
    e.preventDefault()
    const MultaValueInsp = document.getElementById('Multas').value;
    const id = doc.id;
    console.log("los puntos que le quita la multa seleccionada son: "+MultaValueInsp + "al id "+id);
    restaPuntos(MultaValueInsp, PtosdeLibreta, id);
})
            }else{
                console.log('mal')
            }
        })
    })
        
    }else{
        console.log("falla");
    }
  
   }) 

    function restaPuntos(MultaValueInsp, PtosdeLibreta, id){
        const LibPuntos = PtosdeLibreta - MultaValueInsp;
        console.log('la resta de los puntos da: '+ LibPuntos);
        console.log(id + " el id es ")
         updateTask(id, { LibPuntos})
         if(LibPuntos < 0){
             const LibPuntos = 0;
             const LibStatus = "Deshabilitada";
            updateTask(id, { LibPuntos, LibStatus})
            
         }
    } 

    // fin de inspector funcionando 

        // instructor
        const taskInstrucorForm = document.getElementById("task-inst-form");
        taskInstrucorForm.addEventListener('submit', (e) => {
            e.preventDefault()
            
            const IdBusInstr = document.getElementById('IdBUsInst').value;
            const IdBusInstrUpp = IdBusInstr.toUpperCase();
            
            if (IdBusInstrUpp != ''){
                console.log("buscando desde inpector "+ IdBusInstrUpp);
                clearInst();
                onGetTasks((datafomDB) =>{
                    let html6 ='';
                    datafomDB.forEach(doc =>{
                        const taskWithCap = doc.data();
                        const PtosdeLibretaCap = taskWithCap.LibPuntos;
                        console.log('desde data '+taskWithCap.LibIdentificador);
                        if(taskWithCap.LibIdentificador == IdBusInstrUpp){
                            html6 +=`
                            <div></br>
                            <h3> N° de libreta : ${taskWithCap.LibIdentificador}</h3>
                            <p> Categoria de libreta : ${taskWithCap.LibCategoria}</p>
                            <p>Nombre del conductor : ${taskWithCap.LibName}</p>
                            <p>Cedula del conductor : ${taskWithCap.LibCedula}</p>
                            <p>Vencimiento de la libreta : ${taskWithCap.LibVto}</p>
                            <p>Observaciones de la libreta : ${taskWithCap.LibObservaciones}</p>
                            <p>Puntos de la libreta : ${taskWithCap.LibPuntos}</p>
                            <p>Libreta habilitada : ${taskWithCap.LibStatus}</p>
                            <br/>
                            <button class='btn-inst-delete BtnBuscar'>Libreta equivocada</button>
                            <button class='btn-inst-Edit BtnBuscar' data-id"${doc.id}">Aprobar</button>
                            </div>
                            `;
                            taskContainerInstUp.innerHTML += html6;
                            // seleccionar los botones para borrar
                            const btnDeleteInst =taskContainerInstUp.querySelectorAll('.btn-inst-delete')
                            btnDeleteInst.forEach(btn =>{
                                btn.addEventListener('click', ({target:{dataset}}) =>{
                                    taskContainerInstUp.innerHTML= "";
                                })
                            })
                            const btnEditInsT =taskContainerInstUp.querySelectorAll('.btn-inst-Edit')
                            btnEditInsT.forEach(btn => {
                               btn.addEventListener('click', ({target:{dataset}})=>{
                                   document.getElementById('SelectCursos').style.display="block";
                               })
                            })
                            const selectCursosInsp = document.getElementById('Cursos');
                            selectCursosInsp.addEventListener('change', (e) =>{
                                e.preventDefault()
                                const CursValueInst = document.getElementById('Cursos').value;
                                const id = doc.id;
                                console.log("los puntos que le suma el curso seleccionada son: "+CursValueInst + " al id "+id);
                                sumaPuntosINST(CursValueInst, PtosdeLibretaCap, id);
                            })

                        }else{
                            console.log("Libreta no encontrada");
                        }
                    })
                })
            }else{
                console.log('error');
            }

        })
        function sumaPuntosINST(CursValueInst, PtosdeLibretaCap, id){
            const LibPuntos = parseInt(PtosdeLibretaCap) + parseInt( CursValueInst);
            console.log('la suma de los puntos da: '+ LibPuntos);
            console.log(id + " el id es ")
            console.log(PtosdeLibretaCap + " los puntos de antes son ")
           
            updateTask(id, { LibPuntos})
         if(LibPuntos > 100){
             const LibPuntos = 100;
             const LibStatus = "Habilitada";
            updateTask(id, { LibPuntos, LibStatus})
            
         }
        }

    // funciones de mover web
    function moverGuarData(){
        window.scrollTo(0, 3900);
    }
    function moverbuscarData(){
        window.scrollTo(0, 2200);
    }
    function moverEditData(){
        window.scrollTo(0, 1200);
    }
    function clear(){
        document.getElementById('IdBUsInsp').value ='';
    }
    function clearInst(){
        document.getElementById('IdBUsInst').value ='';
    }
    function searchMulta(){
        window.scrollTo(0, 2650);
    }
    function movelibselectInsp(){
        window.scrollTo(0, 1650)
    }

    /* // ingreso 
    const taskImAdminForm = document.getElementById("IngresarAdmin");
        taskImAdminForm.addEventListener('submit', (e) => {
            e.preventDefault()
            
            const Intendencia = document.getElementById('UserIM').value;
            console.log(Intendencia);

        })
    function User1(){
        let Intendencia = document.getElementById('UserIM').value;
    if(Intendencia == "Intendencia"){
        document.getElementById('cardBody').style.display= "block";
    }else{
        document.getElementById('cardBody').style.display= "none";
    }
    } */

    const taskchange = document.getElementById("info");
    taskchange.addEventListener('click',  (e) =>{
        e.preventDefault()
        console.log("hsad")
        document.getElementById("info2").style.display = "block";
        document.getElementById("info").style.display = "none";
        
    })

   