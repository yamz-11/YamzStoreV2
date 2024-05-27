function showDescription(id) {
    var desc = document.getElementById(id);
    if (desc.style.display === "none" || desc.style.display === "") {
        desc.style.display = "block";
    } else {
        desc.style.display = "none";
    }
}

function selectPaymentMethod(productName) {
    var modal = document.getElementById("paymentModal");
    modal.style.display = "block";
    modal.setAttribute('data-product', productName);
    console.log("Selected product: " + productName);
}

function closeModal() {
    var modal = document.getElementById("paymentModal");
    modal.style.display = "none";
}

function closeDanaModal() {
    var danaModal = document.getElementById("danaModal");
    danaModal.style.display = "none";
}

function payWith(method) {
    console.log("Payment method: " + method);
    if (method === "Dana") {
        var danaModal = document.getElementById("danaModal");
        var qrisImage = document.getElementById("qrisImage");
        qrisImage.src = "images/qris.png"; // Path gambar QRIS Anda
        var productName = document.getElementById("paymentModal").getAttribute('data-product');
        danaModal.setAttribute('data-product', productName);
        danaModal.style.display = "block";
        closeModal();
    } else {
        var modal = document.getElementById("paymentModal");
        var productName = modal.getAttribute('data-product');
        var whatsappNumber = "6282278501731"; // Ganti dengan nomor WhatsApp Anda
        var message = `Halo, saya tertarik untuk membeli produk: ${productName} melalui ${method}`;
        var url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        console.log("WhatsApp URL: " + url);
        window.location.href = url;
        closeModal();
    }
}

function confirmPayment(method) {
    var modal = document.getElementById("danaModal");
    var productName = modal.getAttribute('data-product');
    var whatsappNumber = "6282278501731"; // Ganti dengan nomor WhatsApp Anda
    var message = `Halo, saya telah melakukan pembayaran untuk produk: ${productName} melalui ${method}`;
    var buktiImage = document.getElementById("buktiImage");
    if (buktiImage.src && buktiImage.style.display === "block") {
        message += ` dan mengunggah bukti pembayaran.`;
    }
    var url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    console.log("Confirm payment URL: " + url);
    window.location.href = url;
    closeDanaModal();
}

function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('buktiImage');
        output.src = reader.result;
        output.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    var modal = document.getElementById("paymentModal");
    var danaModal = document.getElementById("danaModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == danaModal) {
        danaModal.style.display = "none";
    }
}
