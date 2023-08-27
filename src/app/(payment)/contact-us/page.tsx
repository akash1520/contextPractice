function ContactUs() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Contact Mentea</h1>

      <div className="mb-4">
        <strong>Email:</strong>
        <p>support@mentea.com</p>  {/* You can replace with your actual email */}
      </div>
      
      <div className="mb-4">
        <strong>Mobile Number:</strong>
        <p>+91 931625283</p>  {/* Replace with your actual mobile number if available */}
      </div>

      <div>
        <strong>Operating Address:</strong>
        <p>
         GISC - LDCE, Ahmedabad,
          India
        </p>
      </div>
    </div>
  );
}

export default ContactUs;
