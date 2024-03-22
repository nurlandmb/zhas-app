import {About} from './ui/About/About.tsx';
import {Banner} from './ui/Banner/Banner.tsx';
import {Participate} from './ui/Participate/Participate.tsx';
import {Timeline} from './ui/Timeline/Timeline.tsx';
import {Contacts} from './ui/Contacts/Contacts.tsx';

// TODO: BANNER section +
// TODO: ABOUT project section +
// TODO: Who can participate section +
// TODO: timeline section +
// TODO: documents section
// TODO: Contacts +
// Todo: Footer +
function Home() {
    return (
        <>
            <Banner />
            <About />
            <Participate />
            <Timeline />
            <Contacts />
        </>
    );
}

export default Home;