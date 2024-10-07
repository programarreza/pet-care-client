"use server";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen text-white bg-[#101214] rounded-lg">
      <div className="container mx-auto py-10 ">
        {/* Our mission and vision */}
        <div className="rounded-lg shadow-lg p-8 space-y-8">
          <h3 className="text-3xl font-semibold text-center uppercase">
            About Us
          </h3>

          {/* Company Introduction */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Your Companion in Pet Care
            </h2>
            <p className="text-lg">
              At <strong>Pet Care Tips & Stories</strong>, we are passionate
              about helping pet owners provide the best care for their beloved
              companions. Through valuable tips, heartwarming stories, and
              expert advice, we aim to create a community of well-informed and
              loving pet owners.
            </p>
          </div>

          {/* Mission Section */}
          <div className="space-y-4">
            <hr className="border-gray-700" />
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p className="text-lg">
              Our mission is to empower pet owners by offering expert advice on
              pet care, nutrition, and well-being. We aim to foster a deeper
              understanding of how to maintain a happy and healthy lifestyle for
              pets while sharing stories that inspire love and compassion.
            </p>
          </div>

          {/* Vision Section */}
          <div className="space-y-4">
            <hr className="border-gray-700" />
            <h3 className="text-2xl font-semibold">Our Vision</h3>
            <p className="text-lg">
              We envision a world where every pet receives the care and love
              they deserve, supported by a community of responsible and
              dedicated pet owners who share their experiences and knowledge.
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <hr className="border-gray-700" />
            <h3 className="text-2xl font-semibold">Contact Information</h3>
            <p className="text-lg">
              <strong>Email:</strong> support@petcaretipsstories.com
            </p>
            <p className="text-lg">
              <strong>Phone:</strong> +1 (234) 567-8910
            </p>
            <p className="text-lg">
              <strong>Address:</strong> 567 Pet Care Avenue, Pet City, PA 12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
