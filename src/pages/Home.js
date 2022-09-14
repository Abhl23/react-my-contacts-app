import { CreateContact, Loader, ContactCard } from "../components";
import { useContacts } from "../hooks";

function Home() {
  const contacts = useContacts();

  return (
    <div
      className="col-auto border rounded shadow bg-white overflow-scroll"
      style={{ height: "80vh", padding: "20px 20px" }}
      id="home-container"
    >
      <h2
        className="text-center"
        style={{
          fontFamily: "sans-serif",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Contacts List
      </h2>
      <CreateContact />
      <div style={{ marginTop: "1rem" }}>
        {contacts.loading && <Loader />}
        {contacts.data.map((contact) => (
          <ContactCard contact={contact} key={contact.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
