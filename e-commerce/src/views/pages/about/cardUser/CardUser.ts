import { View } from '../../../View';
import { ImgUser } from './imgUser/ImgUser';
import { RoleUser } from './roleUser/RoleUser';
import { LettersUser } from './letterUser/LetterUser';
import { NameUser } from './nameUser/NameUser';
import { BioUser } from './bioUser/BioUser';
import { Contribution } from './contributionUser/ContributionUser';
import { GitHubUser } from './gitHubUser/GitHubUser';
import { ContainerUser } from '../container/Container';
import './CardUser.scss';

export class CardUser extends View {
    constructor(
        imgUser: string,
        roleUser: string,
        letter: string,
        nameUser: string,
        bioUser: string,
        contribution: string,
        GitHubUser: string
    ) {
        super({ tag: 'div', classNames: ['user-card'] });
        this.setupCard(imgUser, roleUser, letter, nameUser, bioUser, contribution, GitHubUser);
    }

    setupCard(
        imgUser: string,
        roleUser: string,
        letter: string,
        nameUser: string,
        bioUser: string,
        contribution: string,
        gitHubUser: string
    ) {
        const imgUsers = new ImgUser(imgUser).getElement();
        this.viewHtmlElement.addInnerElement(imgUsers);

        const div = new ContainerUser().getElement();

        const roleUsers = new RoleUser(roleUser).getElement();

        const letters = new LettersUser(letter).getElement();

        const nameUsers = new NameUser(nameUser).getElement();

        const bioUsers = new BioUser(bioUser).getElement();

        const contributionUser = new Contribution(contribution).getElement();

        const gitHubUsers = new GitHubUser(
            gitHubUser,
            `https://github.com/${gitHubUser}`
        ).getElement();

        div.append(
            roleUsers,
            roleUsers,
            letters,
            nameUsers,
            bioUsers,
            contributionUser,
            gitHubUsers
        );
        this.viewHtmlElement.addInnerElement(div);
    }
}
