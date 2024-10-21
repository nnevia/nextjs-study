import Link from 'next/link';

export default function ClientPage() {
  const clients = [
    { id: 'Max', name: 'Maxmilian' },
    { id: 'Menu', name: 'Menu' },
  ];
  return (
    <div>
      <h1>Client Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: '/clients/[id]',
                query: { id: client.id },
              }}
            >
              {client.name} Page
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
