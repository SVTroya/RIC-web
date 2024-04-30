import Link from 'next/link'

function Home() {
  return (
    <section className='w-full mt-36 flex flex-col justify-center items-center gap-14'>
      <h1 className='head_text font-extrabold text-center'>
        Start a new game of
        <br/>
        <span className='orange_gradient text-center'> Railroad Ink Challenge</span>
      </h1>

      <Link href='/game-setup' className='btn'>Play</Link>

    </section>
  );
}

export default Home
