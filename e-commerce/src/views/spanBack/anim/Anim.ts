import { View } from '../../View';
import { SpanAnim } from '../SpanBack';
import './Anim.scss';

export class AnimBack extends View {
    constructor() {
        super({ tag: 'section', classNames: ['animated-background'] });
        this.setupBackground();
    }

    private setupBackground(): void {
        for (let i = 0; i < 144; i += 1) {
            const span = new SpanAnim();
            this.getElement().appendChild(span.getElement());
        }
    }
}
