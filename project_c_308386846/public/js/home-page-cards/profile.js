var card = document.getElementById('user-name');
        let name = 'Ofry Makdasy';
        let age = '22';
        let type = 'Casual';
        let rank = '5';
        let phone = '0542070962';
        let email = 'ofrymk@gmail.com';
        let expiriance = 'less then 6 months'

        
        card.innerHTML =  card.innerHTML + '<h2 class="name" id="user-name">'+ name +'</h2>' + 
                        '<div class="description">Age: '+ age +'</div>' + 
                        '<div class="description">Skate type: '+ type +'</div>' + 
                        '<div class="description">Skate level: '+ rank + '</div>' +
                        '<div class="description">Expiriance: '+ expiriance + '</div>'+
                        '<div class="description">Phone number: '+ phone + '</div>'+
                        '<div class="description">Email address: '+ email + '</div>'+
                        '<button class="button">Add New Mate</button>';