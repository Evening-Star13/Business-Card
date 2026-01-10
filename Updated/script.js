document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('businessCard');
    const cardInner = document.getElementById('cardInner');
    const vcardBtn = document.getElementById('vcardBtn');
    
    // QR Modal elements
    const qrModal = document.getElementById('qrModal');
    const qrOpenBtn = document.getElementById('qrOpenBtn');
    const qrCloseBtn = document.getElementById('qrCloseBtn');
    const qrImage = document.getElementById('qrImage');

    const vcardData = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "FN:Chris Barranger",
        "ORG:BarrTech Solutions",
        "TITLE:Web & Software Developer",
        "TEL;TYPE=CELL:2892444466",
        "EMAIL:BarrTechSolutions@consultant.com",
        "END:VCARD"
    ].join("\n");

    // 1. Flip Logic
    card.addEventListener('click', (e) => {
        const isContactLink = e.target.closest('.contact-link');
        if (!isContactLink) {
            cardInner.classList.toggle('flipped');
        }
    });

    // 2. Download vCard File
    vcardBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const blob = new Blob([vcardData], { type: "text/vcard" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Chris_Barranger.vcf");
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);
    });

    // 3. QR Code Logic
    qrOpenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const encodedVcard = encodeURIComponent(vcardData);
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedVcard}`;
        qrModal.classList.remove('hidden');
    });

    qrCloseBtn.addEventListener('click', () => {
        qrModal.classList.add('hidden');
    });

    qrModal.addEventListener('click', (e) => {
        if(e.target === qrModal) qrModal.classList.add('hidden');
    });
});
