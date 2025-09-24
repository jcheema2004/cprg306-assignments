import Link from "next/link";

export default function Home(){

  return(
    <main>
      <h1>CPRG306 Assignments</h1>
      <ul>
        <li><Link href="./week-2">Week 2 Assignment</Link></li>
        <li><Link href="./week-3">Week 3 Assignment</Link></li>
        <li><Link href="./week-4">Week 4 Assignment</Link></li>
      </ul>
    </main>
  )
}