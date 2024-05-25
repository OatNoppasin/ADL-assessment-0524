document.addEventListener('DOMContentLoaded', () => {
    goToPage(1);
});

function goToPage(pageNumber) {
    if (pageNumber === 2 && !validateForm('personalInfoForm')) {
        alert('กรุณาตอบคำถามให้ครบ');
        return;
    } else if (pageNumber === 3 && !validateForm('assessmentForm')) {
        alert('กรุณาตอบคำถามให้ครบ');
        return;
    }

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page${pageNumber}`).classList.add('active');
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    return form.checkValidity();
}

function calculateScore() {
    if (!validateForm('assessmentForm')) {
        alert('กรุณาตอบคำถามให้ครบ');
        return;
    }

    const form = document.getElementById('assessmentForm');
    const formData = new FormData(form);
    let totalScore = 0;

    for (const [key, value] of formData.entries()) {
        totalScore += parseInt(value, 10);
    }

    let classification;
    if (totalScore >= 12) {
        classification = 'กลุ่มติดสังคม';
    } else if (totalScore >= 5) {
        classification = 'กลุ่มติดบ้าน';
    } else {
        classification = 'กลุ่มติดเตียง';
    }

    document.getElementById('scoreResult').innerText = `คะแนนรวม: ${totalScore}\nกลุ่ม: ${classification}`;
    goToPage(3);
}

document.getElementById('additionalForm').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm('additionalForm')) {
        alert('กรุณาตอบคำถามให้ครบ');
        return;
    }

    const personalInfoForm = new FormData(document.getElementById('personalInfoForm'));
    const assessmentForm = new FormData(document.getElementById('assessmentForm'));
    const additionalForm = new FormData(document.getElementById('additionalForm'));

    const allData = {};
    for (const [key, value] of personalInfoForm.entries()) allData[key] = value;
    for (const [key, value] of assessmentForm.entries()) allData[key] = value;
    for (const [key, value] of additionalForm.entries()) allData[key] = value;

    sendToGoogleSheets(allData);

    alert('ขอบคุณสำหรับการทำแบบสอบถาม');
    setTimeout(() => {
        window.close();
    }, 1000);
});

function sendToGoogleSheets(data) {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



