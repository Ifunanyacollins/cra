import { useGetCategories } from "./api";
import Accordion from "./component/accordion";
import Edit from "./component/edit";
import Header from "./component/header";
import { useStore } from "./store";

const accordionItems = [
  {
    id: 1,
    name: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces, particularly single-page applications. It allows developers to create reusable UI components and manage the state of these components efficiently.',
  },
  {
    id: 2,
    name: 'What is Tailwind CSS?',
    content: 'Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs. Instead of pre-designed components, it offers highly composable, low-level utility classes that let you build custom designs without ever leaving your HTML.',
  },

];

function App() {
 const {access_token} = useStore()
  const {data} =  useGetCategories(access_token)

  return (
    <div className="min-h-screen flex flex-col">
     <Header />
      <div className='flex flex-1'>
        <div className="w-[20%]">
        <Accordion items={data ?? []} />
        </div>
        <div>
          <Edit/>
        </div>
        </div>
    </div>
  );
}

export default App;
