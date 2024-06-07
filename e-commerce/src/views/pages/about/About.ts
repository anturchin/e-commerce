import { View } from '../../View';
import { CardUserList } from './cardListUser/CardListUser';
import { Collaboration } from './collaboration/Collaboration';
import './About.scss';

export interface IUserCards {
    imgUrl: string;
    role: string;
    letter: string;
    name: string;
    bio: string;
    contribution: string;
    git: string;
}

const userCards: IUserCards[] = [
    {
        imgUrl: 'https://avatars.githubusercontent.com/u/34959976?v=4',
        role: 'Frontend developer',
        letter: 'F',
        name: 'Fedor Arsenyev',
        bio: 'Fedor Arsenyev is an enthusiast in the field of frontend development and neural networks. Fedor is known for his ability to lift the teams spirits with funny memes, making the work atmosphere lighter and more enjoyable',
        contribution:
            'Fedor plays a key role in the project, being responsible for implementing server operations and request handling. This task requires not only technical proficiency but also the ability to quickly adapt to changes, which Fedor successfully demonstrates. He not only overcomes technical difficulties but also introduces innovative ideas, such as optimizing data processing workflows, which significantly enhances the systems performance and stability. Thanks to his efforts, the team can rely on efficient server architecture.',
        git: 'farsenyev',
    },
    {
        imgUrl: 'https://avatars.githubusercontent.com/u/31282057?v=4',
        role: 'Team lead',
        letter: 'A',
        name: 'Andrey Turchin',
        bio: 'Andrey Turkhin is passionate about frontend development and is the person who best understands the technical details and architecture of the project. He is always ready to provide support to team members on any issue.',
        contribution:
            'Andrey, as the team leader, significantly influences the success of our project through his work on architecture, utilities, and routing. He is also responsible for code testing coverage, which ensures the high quality and reliability of our product. Andrey makes a key contribution to the project by developing complex solutions that enhance the efficiency and performance of the system. His leadership and ability to guide the team not only help achieve set goals but also create an atmosphere of innovation and collaboration within the team.',
        git: 'anturchin',
    },
    {
        imgUrl: 'https://avatars.githubusercontent.com/u/114692748?v=4',
        role: 'Frontend developer',
        letter: 'D',
        name: 'Daria Shilnikova',
        bio: 'Darya Shilnikova is passionate about frontend development, neural networks, and business analytics. In the project, she is responsible for the websites frontend and components. Darya is known for her ability to boost team spirit and motivate its members.',
        contribution:
            'Darya makes a significant contribution to our project, being responsible for the development of the websites external part and its components. She has successfully implemented a series of user interfaces that not only improved the visual perception of our product but also significantly enhanced its usability. Darya also overcame many technical challenges associated with adapting the interface to various devices and platforms, ensuring excellent display quality on all types of screens.',
        git: 'dasha2101',
    },
];

export class About extends View {
    private userCards: CardUserList | null = null;

    private colaboration: Collaboration | null = null;

    constructor() {
        super({ tag: 'section', classNames: ['content', 'about'] });
        this.renderUserList();
    }

    public renderUserList(props: IUserCards[] = userCards) {
        this.userCards = new CardUserList(props);
        this.viewHtmlElement.addInnerElement(this.userCards.getElement());

        this.colaboration = new Collaboration();
        this.viewHtmlElement.addInnerElement(this.colaboration.getElement());
    }

    public getWrapperList(): CardUserList | null {
        return this.userCards;
    }
}
