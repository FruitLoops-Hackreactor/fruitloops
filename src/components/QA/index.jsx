import Question from './Question';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function QA() {
  let exampleQuestions = [
    {
        "question_id": 328987,
        "question_body": "Voluptatem sed dicta voluptatem veritatis laboriosam facere esse.",
        "question_date": "2021-06-13T00:00:00.000Z",
        "asker_name": "Roscoe_Abernathy92",
        "question_helpfulness": 29,
        "reported": false,
        "answers": {
            "3073698": {
                "id": 3073698,
                "body": "Sint laboriosam illo recusandae et molestiae sed accusamus.",
                "date": "2020-09-17T00:00:00.000Z",
                "answerer_name": "Telly.Shields",
                "helpfulness": 8,
                "photos": []
            },
            "3073699": {
                "id": 3073699,
                "body": "Iste vero amet ut reiciendis ullam consequuntur animi modi enim.",
                "date": "2021-03-16T00:00:00.000Z",
                "answerer_name": "Fabian97",
                "helpfulness": 10,
                "photos": [
                    "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
                ]
            },
            "3073700": {
                "id": 3073700,
                "body": "Excepturi pariatur ea.",
                "date": "2020-09-06T00:00:00.000Z",
                "answerer_name": "Ebba33",
                "helpfulness": 10,
                "photos": []
            },
            "3073701": {
                "id": 3073701,
                "body": "Magnam ducimus architecto reprehenderit deserunt enim velit.",
                "date": "2021-02-21T00:00:00.000Z",
                "answerer_name": "Constance.Jaskolski",
                "helpfulness": 6,
                "photos": []
            },
            "3073702": {
                "id": 3073702,
                "body": "Ea nam exercitationem sapiente.",
                "date": "2020-08-15T00:00:00.000Z",
                "answerer_name": "Antonette_Bednar",
                "helpfulness": 12,
                "photos": [
                    "https://images.unsplash.com/photo-1558014356-f7c41bc744f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                ]
            }
        }
    },
    {
        "question_id": 328979,
        "question_body": "Iusto et ut.",
        "question_date": "2021-05-30T00:00:00.000Z",
        "asker_name": "Fausto.Fritsch",
        "question_helpfulness": 25,
        "reported": false,
        "answers": {
            "3073613": {
                "id": 3073613,
                "body": "Velit ducimus excepturi aut iure dolor voluptate consequatur deleniti aut.",
                "date": "2020-09-16T00:00:00.000Z",
                "answerer_name": "Blanca_Stamm",
                "helpfulness": 19,
                "photos": [
                    "https://images.unsplash.com/photo-1547257965-087be799b084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "https://images.unsplash.com/photo-1553981834-a23f5b69e3ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                ]
            },
            "3073614": {
                "id": 3073614,
                "body": "Officiis alias minus quo inventore et laboriosam dolores.",
                "date": "2021-05-13T00:00:00.000Z",
                "answerer_name": "Hettie_Nienow62",
                "helpfulness": 16,
                "photos": []
            },
            "3073615": {
                "id": 3073615,
                "body": "Quia et iusto accusamus eum eveniet ad vel amet natus.",
                "date": "2020-11-27T00:00:00.000Z",
                "answerer_name": "Joanie.Strosin",
                "helpfulness": 12,
                "photos": [
                    "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "https://images.unsplash.com/photo-1422728221357-57980993ea99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"
                ]
            },
            "3073616": {
                "id": 3073616,
                "body": "Libero et voluptatibus necessitatibus sit voluptatibus vero reiciendis.",
                "date": "2021-02-19T00:00:00.000Z",
                "answerer_name": "Rebeka60",
                "helpfulness": 13,
                "photos": [
                    "https://images.unsplash.com/photo-1554774853-d50f9c681ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80",
                    "https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                ]
            },
            "3073617": {
                "id": 3073617,
                "body": "Et omnis libero velit.",
                "date": "2020-10-14T00:00:00.000Z",
                "answerer_name": "Aurelia_Fay2",
                "helpfulness": 11,
                "photos": [
                    "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                ]
            },
            "3073618": {
                "id": 3073618,
                "body": "Adipisci cupiditate repudiandae assumenda rerum optio.",
                "date": "2020-12-04T00:00:00.000Z",
                "answerer_name": "Rosendo30",
                "helpfulness": 11,
                "photos": [
                    "https://images.unsplash.com/photo-1485646979142-d4abb57a876f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
                ]
            },
            "3073619": {
                "id": 3073619,
                "body": "Occaecati aut qui.",
                "date": "2021-04-21T00:00:00.000Z",
                "answerer_name": "Sydnie44",
                "helpfulness": 15,
                "photos": [
                    "https://images.unsplash.com/photo-1470434767159-ac7bf1b43351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                ]
            },
            "3073620": {
                "id": 3073620,
                "body": "Totam quibusdam voluptate a unde voluptatum minus porro nostrum praesentium.",
                "date": "2020-10-10T00:00:00.000Z",
                "answerer_name": "Peyton.Treutel84",
                "helpfulness": 0,
                "photos": []
            },
            "3073621": {
                "id": 3073621,
                "body": "Recusandae omnis quia sint minus aut facilis quis.",
                "date": "2020-12-21T00:00:00.000Z",
                "answerer_name": "Kendall_Koss3",
                "helpfulness": 7,
                "photos": [
                    "https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                    "https://images.unsplash.com/photo-1505248254168-1de4e1abfa78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80"
                ]
            },
            "3073622": {
                "id": 3073622,
                "body": "Blanditiis debitis beatae dolores voluptate sequi sint aperiam sint rerum.",
                "date": "2020-10-30T00:00:00.000Z",
                "answerer_name": "Woodrow.Rolfson",
                "helpfulness": 14,
                "photos": [
                    "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                ]
            },
            "3073623": {
                "id": 3073623,
                "body": "Aperiam et perferendis voluptate necessitatibus quia.",
                "date": "2021-08-05T00:00:00.000Z",
                "answerer_name": "Manley_Windler",
                "helpfulness": 9,
                "photos": [
                    "https://images.unsplash.com/photo-1520904549193-5ab0027b3fa6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                ]
            }
        }
    },
    {
        "question_id": 328985,
        "question_body": "Quasi commodi soluta.",
        "question_date": "2021-01-22T00:00:00.000Z",
        "asker_name": "Triston33",
        "question_helpfulness": 23,
        "reported": false,
        "answers": {
            "3073670": {
                "id": 3073670,
                "body": "Et aut itaque magni a.",
                "date": "2021-07-22T00:00:00.000Z",
                "answerer_name": "Kaela42",
                "helpfulness": 3,
                "photos": [
                    "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                ]
            },
            "3073671": {
                "id": 3073671,
                "body": "Non aut et omnis est quia non explicabo aut.",
                "date": "2020-11-30T00:00:00.000Z",
                "answerer_name": "Jaleel_Johnson",
                "helpfulness": 14,
                "photos": []
            },
            "3073672": {
                "id": 3073672,
                "body": "Nihil officia incidunt est.",
                "date": "2020-10-24T00:00:00.000Z",
                "answerer_name": "Enoch53",
                "helpfulness": 12,
                "photos": []
            },
            "3073673": {
                "id": 3073673,
                "body": "Porro laboriosam aut quam eum sit voluptas.",
                "date": "2021-06-06T00:00:00.000Z",
                "answerer_name": "Janis_Romaguera63",
                "helpfulness": 10,
                "photos": [
                    "https://images.unsplash.com/photo-1461551449292-b63f7419ac93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1970&q=80"
                ]
            },
            "3073674": {
                "id": 3073674,
                "body": "Consequatur rerum voluptatem quia nihil.",
                "date": "2021-06-08T00:00:00.000Z",
                "answerer_name": "Dorothea.Friesen",
                "helpfulness": 6,
                "photos": [
                    "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                    "https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80"
                ]
            },
            "3073675": {
                "id": 3073675,
                "body": "Dolorem nostrum nisi incidunt vitae.",
                "date": "2021-02-03T00:00:00.000Z",
                "answerer_name": "Sasha_Blanda",
                "helpfulness": 12,
                "photos": []
            },
            "3073676": {
                "id": 3073676,
                "body": "Aliquam eius sapiente.",
                "date": "2020-10-20T00:00:00.000Z",
                "answerer_name": "Crawford.Harris79",
                "helpfulness": 2,
                "photos": []
            },
            "3073677": {
                "id": 3073677,
                "body": "Fuga quis quia vitae sed.",
                "date": "2021-01-10T00:00:00.000Z",
                "answerer_name": "Gunnar.Bode37",
                "helpfulness": 15,
                "photos": []
            },
            "3073678": {
                "id": 3073678,
                "body": "Totam nam rerum tempora sit fuga voluptas.",
                "date": "2020-12-27T00:00:00.000Z",
                "answerer_name": "Carmella.Miller",
                "helpfulness": 3,
                "photos": [
                    "https://images.unsplash.com/photo-1457968867385-9f877f3f2bce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                    "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                ]
            },
            "3073679": {
                "id": 3073679,
                "body": "In sed voluptas iste error expedita ea id dicta.",
                "date": "2021-05-24T00:00:00.000Z",
                "answerer_name": "Avery.Marks53",
                "helpfulness": 16,
                "photos": [
                    "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                    "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                ]
            }
        }
    },
    {
        "question_id": 328983,
        "question_body": "Est autem aut voluptas amet quibusdam omnis.",
        "question_date": "2021-05-19T00:00:00.000Z",
        "asker_name": "Leopoldo46",
        "question_helpfulness": 22,
        "reported": false,
        "answers": {
            "3073646": {
                "id": 3073646,
                "body": "Dicta laudantium ratione et ab et.",
                "date": "2021-03-22T00:00:00.000Z",
                "answerer_name": "Daniella.Botsford16",
                "helpfulness": 7,
                "photos": [
                    "https://images.unsplash.com/photo-1554735490-80893c93b06f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                    "https://images.unsplash.com/photo-1552904219-f4b87efe8792?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80"
                ]
            },
            "3073647": {
                "id": 3073647,
                "body": "Consequuntur consectetur vel aut nam ut labore nam maxime.",
                "date": "2021-05-22T00:00:00.000Z",
                "answerer_name": "Elta_Cummerata3",
                "helpfulness": 0,
                "photos": [
                    "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
                    "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
                ]
            },
            "3073648": {
                "id": 3073648,
                "body": "Ut voluptatum et nulla eius.",
                "date": "2021-06-18T00:00:00.000Z",
                "answerer_name": "Madge0",
                "helpfulness": 14,
                "photos": []
            },
            "3073649": {
                "id": 3073649,
                "body": "Quae enim magni.",
                "date": "2021-04-29T00:00:00.000Z",
                "answerer_name": "Hadley72",
                "helpfulness": 0,
                "photos": [
                    "https://images.unsplash.com/photo-1534960680480-ca9853707e10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2384&q=80"
                ]
            },
            "3073650": {
                "id": 3073650,
                "body": "Delectus natus ut eveniet eligendi.",
                "date": "2021-01-27T00:00:00.000Z",
                "answerer_name": "Leila44",
                "helpfulness": 15,
                "photos": []
            },
            "3073651": {
                "id": 3073651,
                "body": "Aliquam vero quis excepturi.",
                "date": "2021-03-09T00:00:00.000Z",
                "answerer_name": "Alba.Dooley",
                "helpfulness": 16,
                "photos": []
            }
        }
    },
    {
        "question_id": 328982,
        "question_body": "Explicabo esse ea illo qui voluptatum voluptatem voluptas quas quasi.",
        "question_date": "2020-09-05T00:00:00.000Z",
        "asker_name": "Maxie.Murray",
        "question_helpfulness": 22,
        "reported": false,
        "answers": {
            "3073638": {
                "id": 3073638,
                "body": "A et facere dicta atque.",
                "date": "2020-09-07T00:00:00.000Z",
                "answerer_name": "Guy53",
                "helpfulness": 13,
                "photos": []
            },
            "3073639": {
                "id": 3073639,
                "body": "Velit aliquid vel.",
                "date": "2021-05-04T00:00:00.000Z",
                "answerer_name": "Rosemary.Bernier46",
                "helpfulness": 2,
                "photos": [
                    "https://images.unsplash.com/photo-1553830591-d8632a99e6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1511&q=80",
                    "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                ]
            },
            "3073640": {
                "id": 3073640,
                "body": "Consequatur dolore vel non eaque quia debitis quis iure.",
                "date": "2020-10-16T00:00:00.000Z",
                "answerer_name": "Gavin97",
                "helpfulness": 0,
                "photos": [
                    "https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80"
                ]
            },
            "3073641": {
                "id": 3073641,
                "body": "Et ea quasi.",
                "date": "2021-06-09T00:00:00.000Z",
                "answerer_name": "Michaela_Lakin28",
                "helpfulness": 19,
                "photos": [
                    "https://images.unsplash.com/photo-1447879027584-9d17c2ca0333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80",
                    "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                ]
            },
            "3073642": {
                "id": 3073642,
                "body": "Minima rerum sed iure optio dolores et facere in earum.",
                "date": "2020-08-29T00:00:00.000Z",
                "answerer_name": "Kieran.Hickle68",
                "helpfulness": 17,
                "photos": [
                    "https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                ]
            },
            "3073643": {
                "id": 3073643,
                "body": "Repellat et animi.",
                "date": "2021-04-30T00:00:00.000Z",
                "answerer_name": "Thea.OConnell",
                "helpfulness": 3,
                "photos": []
            },
            "3073644": {
                "id": 3073644,
                "body": "Excepturi placeat at totam.",
                "date": "2021-06-20T00:00:00.000Z",
                "answerer_name": "Hildegard65",
                "helpfulness": 16,
                "photos": [
                    "https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80",
                    "https://images.unsplash.com/photo-1559304022-afbf28f53c4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1656&q=80"
                ]
            }
        }
    }
]
  let [questions, setQuestions] = useState(exampleQuestions.slice(0, 4));

  // useEffect(axios.get(
  //   'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions', {
  //   headers: {
  //     Authorization: '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'
  //   },
  //   params: {
  //     product_id: 40343
  //   }})
  //     .then((res) => {
  //       console.log('res questions', res.data.results)
  //       setQuestions(res.data.results);
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     }), [])

  return (
    <section>
      <div className="questions-list">
        {questions.map((question, index) => {
          return <Question question={question} key={index} />
        })}
      </div>
    </section>
  )
}
