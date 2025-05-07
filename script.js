 <script>
        const form = document.getElementById('feedbackForm');
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message'),
                timestamp: new Date().toLocaleString()
            };

            // Replace this URL with your Google Apps Script Web App URL
            const scriptURL = 'https://docs.google.com/spreadsheets/d/1l2jAycfnsCzJBVuniqLKJbK9nfnhdT1dw3XIef11OD8/edit?usp=sharing';

            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                alert('Thank you! Your message has been submitted successfully.');
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('Oops! Something went wrong.');
            });
        });
        function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.timestamp,
    data.name,
    data.email,
    data.phone,
    data.message
  ]);
  
  return ContentService.createTextOutput('Success');
}
    </script>
