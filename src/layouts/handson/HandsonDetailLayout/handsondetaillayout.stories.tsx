import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {
  HandsonDetailLayoutComponent,
  HandsonDetailLayoutComponentProps,
} from '.';

export default {
  title: 'layout/handson/HandsonDetailLayout',
  component: HandsonDetailLayoutComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<HandsonDetailLayoutComponentProps> = (args) => (
  <HandsonDetailLayoutComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  handson: {
    id: 1,
    owner: {
      id: 1,
      username: 'レテト太郎',
    },
    title: 'AWS IoT Core入門編',
    headline:
      'AWS IoT Coreを使用して、M5Stackからの気温データをDynamoDBにロギングしてみましょう',
    detail:
      '文は方針字が投稿なっ原則でたため、執筆なるせる作家に決議権自由の利用主題を満たしれるてはするで、プロジェクトの下は、創作さ状態で引用写すことという存続自由ますあるているななけれ。しかし、記事の侵害者は、記事の反映さ判断厳格ない要件を引用する、この権利をさから権利が信頼さ点で著作満たすられます。およびに、説明内容が例証加えれるからい実況が仮に作らさことは、活用ります、場合については検証性の引用に従って対象上の問題はさことと、本保持権は、適法の引用にしば原則が引用できですばいるたで。',
    require:
      '推奨守らて、誰の編集は色濃くでも抜き出しあっない。しかし、被検証権が、充足さ他の記事、日本語に必要に許諾認めこととするて、ライセンス有償の保護を著者と要求することと取りやめるて、著作さます文が.、参加権意見なですとの防止を加えことも、時に短いとなるてよいますな。',
    document_url: 'https://document.example.com',
    meeting_url: 'https://meeting.example.com',
    movie_url: 'https://movie.example.com',
    start_at: '2021-09-10T10:00',
    end_at: '2021-09-10T11:00',
    is_public: true,
    members: [
      {
        id: 1,
        handson: 1,
        member: {
          id: 1,
          username: 'test1',
        },
      },
      {
        id: 2,
        handson: 1,
        member: {
          id: 2,
          username: 'test2',
        },
      },
    ],
    contents: [
      {
        id: 1,
        handson: 1,
        content:
          '複数はペディア理事と承諾なっ要件あるない際、引用され方針に参照権明確の-フリーがするれては加えませ、出典の例は、許諾認め方針を著作することにおける侵害重要ますないてくださいたた。または、記事の編集号も、方針の利用あり著作活発な下を注意なる、その記事を定めて例に創作とどめことで接触できれた。',
        passed_members: [
          {
            id: 1,
            content: 1,
            member: {
              id: 1,
              username: 'レテト太郎',
            },
          },
        ],
      },
      {
        id: 2,
        handson: 1,
        content:
          'またに、執筆方針を登場含むれている記事が仮にするなることも、発揮でませ、一部によるも扱い性の手続として日本語上の問題はすることを、お投稿物は、明確の利用をするば受け入れと一見あたりでばくださいますます。要求しれて、これらの著作は強くなど取りやめるですある。あるいは、本著作元に、引用行うフリーの資料、ライセンスに適切に陳述することにしれて、フェア本文の編集を作家で区別する下にして、著作示しんフリーで投稿、尊重国編集たんとの許諾をしことは、少なくとも難しいとするばよいですな。',
        passed_members: [],
      },
    ],
  },
  currentUserId: 1,
  joinHandsonMember: () => {
    console.log('join handson');
  },
  leaveHandsonMember: () => {
    console.log('leave handson');
  },
  completeHandsonContentMember: (data) => {
    console.log(data);
  },
  revertHandsonContentMember: (data) => {
    console.log(data);
  },
  deleteHandson: () => {
    console.log('delete handson');
  },
};
