const requestTemplate = (body) => {
    const {userForm, projectForm} = body.content;
    return `
        <p>Тегі: ${userForm.name}</p>    
        <p>Есімі: ${userForm.surname}</p>    
        <p>Әкесінің аты: ${userForm.fatherName}</p>    
        <p>Жынысы: ${userForm.gender}</p>    
        <p>ЖСН: ${userForm.iin}</p>    
        <p>Туған күні: ${userForm.birthDate}</p>    
        <p>ҚР азаматтығы бар ма: ${userForm.kzCitizenship ? 'Иә' : 'Жоқ'}</p>    
        <p>Почта: ${userForm.email}</p>    
        <p>Номер: ${userForm.phone}</p>    
        <p>Қосалқы почта: ${userForm.additionalEmail}</p>    
        <p>Қосалқы номер: ${userForm.additionalPhone}</p>    
        <p>Отбасылық жағдайы: ${userForm.familyStatus}</p>    
        <p>Қазір бос: ${userForm.currentlyFree}</p>    
        <p>Жұмыс істемеу мерзімі: ${userForm.notWorkingFor}</p>    
        <p>Оқып жатыр ма: ${userForm.isStudying === 'confirm' ? 'Иә' : 'Жок'}</p>    
        <p>Жұмыс істеп жатыр ма: ${userForm.isWorking ? 'Иә' : 'Жок'}</p>    
        <p>Декреттік демалыс: ${userForm.isMaternityLeave === 'Нет' || userForm.isMaternityLeave === 'Жоқ' ? 'Жоқ' : 'Иә'}</p>    
        <p>Облыс: ${userForm.region}</p>    
        <p>Аймақ түрі: ${userForm.addressType}</p>    
        <p>Адрес: ${userForm.address}</p>
        <p>Білім деңгейі: ${userForm.degree}</p>    
        <p>Қатысқан жобалар: ${userForm.govProjects.join(', ')}</p>    
        <p>Тізімде жоқ қатысқан жобалар: ${userForm.additionalGovProjects}</p>    
        <p>Әлеуметтік желілер бар ма: ${userForm.haveSocials}</p>    
        <p>Әлеуметтік желілерге сілтемелер: ${userForm.socials}</p>    
        <p>Жобай жайлы қалай білді: ${userForm.howKnew.join(', ')}</p>    
            <br> <br><br>
        <p>Жоба атауы: ${projectForm.title}</p>    
        <p>Мақсаты: ${projectForm.goal}</p>    
        <p>Орындалатын аймақ: ${projectForm.applyRegion}</p>    
        <p>Аудитория: ${projectForm.auditory}</p>    
        <p>Аудитория саны: ${projectForm.auditoryCount}</p>    
        <p>Түсіндірме: ${projectForm.description}</p>    
        <p>Серіктестер: ${projectForm.partners}</p>    
        <p>Күтілетін нәтиже: ${projectForm.target}</p>    
        <p>Құны: ${projectForm.price}</p>    
        <p>Тұрақтылық: ${projectForm.sustainability}</p>    
        <p>Ақпараттандыру: ${projectForm.information}</p>    
        <p>Жұмыстар:</p>
        <p>${generateRequestTasks(projectForm.tasks)}</p> 
        <p>Бюджет</p>
         <p>${generateRequestBudget(projectForm.budget)}</p>
    `
};

const generateRequestTasks = (tasks) => {
    return tasks.map((task, i) => {
            return `
        <div>
            <span>${i}</span>
            <span>${task.title}</span>
            <span>${task.auditory}</span>
            <span>${task.time}</span>
        </div>
        `
        }
    ).join('');
}

const generateRequestBudget = (list) => {
    return list.map((item, i) => {
        return `
        <div>
            <span>${i}</span>
            <span>${item.title}</span>
            <span>${item.amount}</span>
            <span>${item.price}</span>
        </div>
        `;

    }).join('')
}

module.exports = requestTemplate;