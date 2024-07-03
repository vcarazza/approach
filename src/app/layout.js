import './styles/global.css';

export const metadata = {
  title: 'Winners Aproach',
  description: 'Approach Arena Winners',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
