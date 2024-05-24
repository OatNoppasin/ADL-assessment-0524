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

    const allData = new FormData();
    for (const [key, value] of personalInfoForm.entries()) allData.append(key, value);
    for (const [key, value] of assessmentForm.entries()) allData.append(key, value);
    for (const [key, value] of additionalForm.entries()) allData.append(key, value);

    // Add your Google Sheets integration here using Google Sheets API
    // For demonstration, we'll just log the data
    for (const [key, value] of allData.entries()) {
        console.log(key, value);
    }

    alert('ขอบคุณสำหรับการทำแบบสอบถาม');
    setTimeout(() => {
        window.close();
    }, 1000);
});
