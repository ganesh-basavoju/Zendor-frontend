export default function About() {
  return (
    <div className="flex flex-col  items-center px-4 md:px-12 lg:px-24">
      {/* Hero Section */}
      <div className="w-full mt-24">
        <img src="https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Studio Design" className="w-full h-[400px] object-cover" />
      </div>

      {/* Introduction Section */}
      <div className="bg-gray-100 w-full py-10 text-center">
        <p className="italic text-lg md:text-xl px-4 md:px-24">
          We are a Mumbai-based studio working in diverse design disciplines. We use design as a medium of collaborative storytelling.
        </p>
        <p className="italic text-lg md:text-xl px-4 md:px-24 mt-4">
          Our body of work largely entails graphic design, illustration, and wall features.
        </p>
      </div>

      {/* Founder Section */}
      <div className="flex flex-col md:flex-row items-center w-full my-12 space-y-8 md:space-y-0 md:space-x-12">
        <img src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Sahiba Madan" className="w-full md:w-1/2 h-auto" />
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl font-bold">Lalith kumar</h2>
          <h3 className="italic text-lg text-gray-600">Founder</h3>
          <p className="mt-4 text-lg">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum minus obcaecati, repellat eum omnis atque quia, quibusdam pariatur molestias mollitia quaerat excepturi explicabo ex! Non sunt quos reprehenderit quasi commodi id natus quis! Excepturi fugiat in id numquam consequatur quas culpa quasi, aliquid, ad, consequuntur impedit perspiciatis alias minus ab?
          </p>
          <p className="mt-4 text-lg">
            She is the founder at Insitu (2019), an architectural and interior design studio focused on crafting in place.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-100 w-full py-10 text-center mb-10">
        <p className="italic text-lg md:text-xl px-4 md:px-24">
          We believe that honesty connects with people and lives beyond.
        </p>
        <p className="italic text-lg md:text-xl px-4 md:px-24 mt-4">
          Our work makes us who we are — these are values that we are committed to live through our practice.
        </p>
      </div>
    </div>
  );
}
