import noble from "../../assets/noble.jpg"

const About = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse gap-10">
      <img src={noble} className="max-w-lg rounded-lg shadow-2xl" />
      <div className="text-justify">
      <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <p>
          Hello, I&apos;m Noble Chakma, an accomplished professional currently serving as the Additional Deputy Commissioner Of Police at Chattogram Metropolitan Police, part of the esteemed Bangladesh Police force. With a solid educational foundation in Applied Physics Electronics & Communication Eng. from Chittagong University, I bring a unique blend of technical expertise and leadership to my role.
        </p>
        <br />
        <p>
          My professional journey includes valuable experience at Bangladesh Bank, where I honed my skills and contributed to the financial sector. Currently residing in the vibrant city of Chittagong, my roots trace back to the scenic landscapes of Khagrachari, adding a cultural richness to my identity.
        </p>
        <br />
        <p>
          Beyond my professional commitments, I am passionate about bird photography, finding solace and inspiration in capturing the beauty of nature. This platform is a glimpse into my diverse experiences and interests. Thank you for joining me on this journey!
        </p>
        <br />
        <button className="btn btn-info">Let&apos;s Connect</button>
      </div>
    </div>
  </div>
  );
};

export default About;
