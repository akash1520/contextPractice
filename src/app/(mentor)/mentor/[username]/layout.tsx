import Navbar from "@/app/components/Navbar/Navbar";

const MentorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MentorLayout;
