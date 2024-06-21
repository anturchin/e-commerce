import { View } from '../../../../View';
import './GitHubUser.scss';

export class GitHubUser extends View {
    constructor(git: string, link: string) {
        super({ tag: 'a', classNames: ['user-card__github'], textContent: git });
        this.setLink(link);
    }

    setLink(link: string) {
        const links = this.viewHtmlElement.getElement();
        links.setAttribute('href', link);
    }
}
