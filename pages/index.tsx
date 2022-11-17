import type { NextPage } from 'next';
import React from 'react';
import { Body } from '../src/layout/body';
import { Card } from '../src/components/shared/card/card';
import { Button } from '../src/components/shared/button/button';
import { LinkButton } from '../src/components/shared/link-button/link-button';
import { Sidebar } from '../src/components/shared/navigation/sidebar';
import { NextPageWithLayout } from './_app';
import { UserContext} from '../src/UserContext';

const Grades = [
  {
    name: 'Math',
    grade: 'A',
    grader: 'Mr. Smith',
    date: '2021-01-01',

  },
  {
    name: 'English',
    grade: 'B',
    grader: 'Mrs. Smith',
    date: '2021-01-01',
  },
  {
    name: 'Science',
    grade: 'C',
    grader: 'Mr. Smith',
    date: '2021-01-01',
  },
  {
    name: 'History',
    grade: 'D',
    grader: 'Mrs. Smith',
    date: '2021-01-01',
  },
  {
    name: 'Math',
    grade: 'A',
    grader: 'Mr. Smith',
    date: '2021-01-01',

  },
  {
    name: 'English',
    grade: 'B',
    grader: 'Mrs. Smith',
    date: '2021-01-01',
  },
  {
    name: 'Science',
    grade: 'C',
    grader: 'Mr. Smith',
    date: '2021-01-01',
  },
  {
    name: 'History',
    grade: 'D',
    grader: 'Mrs. Smith',
    date: '2021-01-01',
  },
  {
    name: 'Math',
    grade: 'A',
    grader: 'Mr. Smith',
    date: '2021-01-01',

  },
  {
    name: 'English',
    grade: 'B',
    grader: 'Mrs. Smith',
    date: '2021-01-01',
  },
  {
    name: 'Science',
    grade: 'C',
    grader: 'Mr. Smith',
    date: '2021-01-01',
  },
  {
    name: 'History',
    grade: 'D',
    grader: 'Mrs. Smith',
    date: '2021-01-01',
  },
]

const Home: NextPageWithLayout = () => {
  const userContext = React.useContext(UserContext);
  const testFetchProfile = () =>{
    fetch('http://localhost:3000/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  const profileIcon = () =>{
    return(
      <img className={'w-10 h-10 rounded-full'} src={'https://i.pravatar.cc/300'} alt={'Pajeet'}/>
    )
  }
  return (
    <Body navbar>

      <div className={'grid grid-cols-3 grid-rows-2 grid-flow-row-dense gap-6 h-full w-full'}>

        <Card
          title={'Recent Grades'}
          className={'flex flex-col gap-2 row-span-2'}>

        <table className={'w-full h-full'}>
          <tbody className={''}>
            <tr className={'text-left'}>
              <th >Subject</th>
              <th>Grade</th>
              <th>Grader</th>
              <th>Date</th>
            </tr>
          {
            Grades.map((grade) => (
              <tr key={grade.name} className={'odd:bg-gray-dark '}>
                <td className={'text-white '}>{grade.name}</td>
                <td className={'text-white'}>{grade.grade}</td>
                <td className={'text-white'}>{grade.grader}</td>
                <td className={'text-white'}>{grade.date}</td>
              </tr>
            ))
          }

          </tbody>
        </table>

        </Card>

        <Card
          title={'Upcoming Assignments'}
          className={'flex flex-col col-start-3 row-span-3'}>
          <div className={'flex flex-col gap-y-2'}>
            <Button onClick={testFetchProfile}> test fetch profile </Button>
            <LinkButton className={'bg-gray-dark/30'} url={'/'} hasCta ctaText={'>'}>
              <div>
                Assignment 1
              </div>
            </LinkButton>
            <LinkButton className={'bg-gray-dark/30'} url={'/'} hasCta ctaText={'>'}>
              <div>
                Assignment 2
              </div>
            </LinkButton>
            <LinkButton className={'bg-gray-dark/30'} url={'/'} hasCta ctaText={'>'}>
              <div>
                Assignment 3
              </div>
            </LinkButton>

          </div>

        </Card>

        <Card
          title={'Recent Messages'}
          className={'flex flex-col'}>

          <div className={'flex flex-col gap-y-2'}>
            <LinkButton className={'flex !justify-between'} url={'/'} title={'Pajeet'} icon={profileIcon()} hasCta ctaText={'Reply'} >
              <div className={'bg-gray-dark dark-boxshadow rounded-md p-2 text-gray-light text-ellipsis whitespace-nowrap overflow-hidden'}>
                Hello sir, I have a question about the assignment.
              </div>
            </LinkButton>

            <LinkButton className={'flex  !justify-between'} url={'/'} title={'Pajeet'} icon={profileIcon()} hasCta ctaText={'Reply'} >
              <div className={'bg-gray-dark dark-boxshadow rounded-md p-2 text-gray-light text-ellipsis whitespace-nowrap overflow-hidden'}>
                Hello sir, I have a question about the assignment.
              </div>
            </LinkButton>

            <LinkButton className={'flex !justify-between'} url={'/'} title={'Pajeet'} icon={profileIcon()} hasCta ctaText={'Reply'} >
              <div className={'bg-gray-dark dark-boxshadow rounded-md p-2 text-gray-light text-ellipsis whitespace-nowrap overflow-hidden'}>
                Hello sir, I have a question about the assignment.
              </div>
            </LinkButton>
          </div>


        </Card>

      </div>
    </Body>
  );
};
export default Home;

Home.getLayout = function getLayout(page){
  return(
    <>
      <Sidebar />
      {page}
    </>
  )
}
