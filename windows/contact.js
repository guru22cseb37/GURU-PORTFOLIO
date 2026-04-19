window.init_contact = function() {
  const content = document.getElementById('content-contact');
  content.innerHTML = `
    <div class="contact-container">
      <div class="contact-info">
        <h2>Get In Touch</h2>
        <p style="margin-top: 10px; color: #555;">Feel free to reach out to me for collaborations or opportunities.</p>
        
        <div style="margin-top: 20px;">
          <p><strong><i class="fa fa-user"></i> Name:</strong> Guru Prasad C</p>
          <p><strong><i class="fa fa-map-marker-alt"></i> Location:</strong> Madurai, Tamil Nadu, India</p>
          <p><strong><i class="fa fa-phone"></i> Phone:</strong> +91 9345090158</p>
          <p><strong><i class="fa fa-envelope"></i> Email:</strong> cguru2005@gmail.com</p>
        </div>

        <div class="social-links">
          <a href="https://github.com/guru22cseb37" target="_blank" class="social-link">
            <i class="fab fa-github fa-2x"></i> GitHub
          </a>
          <a href="https://www.linkedin.com/in/guru-prasad-81ba992ab" target="_blank" class="social-link">
            <i class="fab fa-linkedin fa-2x" style="color: #0077b5;"></i> LinkedIn
          </a>
        </div>
      </div>
      
      <div class="contact-form">
        <h3>Send a Message</h3>
        <input type="text" placeholder="Your Name" id="contact-name" />
        <input type="email" placeholder="Your Email" id="contact-email" />
        <textarea placeholder="Your Message" id="contact-msg"></textarea>
        <button onclick="sendWhatsAppMessage()">Send Message <i class="fa fa-paper-plane"></i></button>
      </div>
    </div>
  `;
};

window.sendWhatsAppMessage = function() {
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const msg = document.getElementById('contact-msg').value.trim();
  
  if (!name || !msg) {
    alert("Please enter your name and a message before sending.");
    return;
  }
  
  const text = `Hello Guru Prasad,\n\nI am ${name} (${email}).\n\n${msg}\n\n---\n(Sent via your Windows 7 Portfolio. I would love to connect with you!)`;
  const whatsappUrl = `https://wa.me/919345090158?text=${encodeURIComponent(text)}`;
  
  window.open(whatsappUrl, '_blank');
};
