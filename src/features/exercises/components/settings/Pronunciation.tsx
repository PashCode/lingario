import Input from "@/shared/components/ui/Input";

function Pronunciation({ pronunciation, setPronunciation }: any) {
  return (
    <div className="border-2 border-green-800">
      <form className="flex gap-2">
        <Input
          id="female-pronounce"
          htmlFor="female-pronounce"
          name="female-pronounce"
          checked={pronunciation.gender === "FEMALE"}
          labelText="ЖІНОЧИЙ"
          type="radio"
          onChange={() => {
            setPronunciation({
              ...pronunciation,
              voice: "en-US-Neural2-H",
              gender: "FEMALE",
            });
          }}
        />

        <Input
          id="male-pronounce"
          htmlFor="male-pronounce"
          name="male-pronounce"
          checked={pronunciation.gender === "MALE"}
          labelText="ЧОЛОВІЧИЙ"
          type="radio"
          onChange={() => {
            setPronunciation({
              ...pronunciation,
              voice: "en-US-Neural2-D",
              gender: "MALE",
            });
          }}
        />
      </form>
    </div>
  );
}

export default Pronunciation;
