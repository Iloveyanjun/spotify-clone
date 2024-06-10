import { search } from "@/apis/spotify";
// I get the albums、artists、tracks

export default async function SearchPage() {
  return (
    <div className="px-2 py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
      <form action={search}>
        <input
          type="text"
          className="bg-black-2000 text-right text-black"
          name="query"
          placeholder="search for songs"
        />
        <button style={{ marginLeft: "10px" }}>Press to search</button>
      </form>
      <div>
        <h2 className="py-5 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
          Albums:
        </h2>
        <div>


        </div>
        <h2 className="py-5 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
          Artists:
        </h2>
        <div>


        </div>
        <h2 className="py-5 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
          Tracks:
        </h2>
        <div>


        </div>
      </div>
    </div>
  );
}

