'use strict';

const up = (queryInterface, Sequelize) => {
  console.log('creating events table...');
  return queryInterface
    .createTable('events', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        isUnique: true,
      },
      category: {
        type: Sequelize.STRING(100),
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        isUnique: true,
      },
      time: {
        type: Sequelize.DATE,
      },
      location: {
        type: Sequelize.STRING(100),
      },
      image_url: {
        type: Sequelize.STRING(200),
        allowNull: false,
        isUnique: true,
      },
      link: {
        type: Sequelize.STRING(1000),
        isUnique: true,
      },
      event_photos: {
        type: Sequelize.STRING(1000),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    })
    .then(() => {
      console.log('inserting events data...');
      return queryInterface.bulkInsert('events', [
        {
          category: 'UTCAA科普讲座',
          title: '《揭秘量子通讯》公益科普讲座',
          time: new Date(2019, 2, 21),
          location: '多伦多大学',
          image_url: 'https://utcaa.com/wp-content/uploads/2019/06/20190609082209.png',
          link:
            'https://mp.weixin.qq.com/s?__biz=MzIxMzA3NTA4Mw==&mid=2659075189&idx=1&sn=e7e1cfc9c26c2d009942c2fe6c73acf5&chksm=8c36b191bb413887c76db3b61c26393ce59f825f76537ae1f7a24efe9e52704fe67a370e203b&mpshare=1&scene=1&srcid=&key=fc6f3f9bd29cbf82cc77926dc4febac4005d9447697341e054651382a8718b1924a25d01f24f250e26925e0904aaeea31c47219f8a2c2c82d9d10c3ffe5b3b25012bdc51537a66b761a4872326566456&ascene=1&uin=MjI3Mjg3NDUwMQ%3D%3D&devicetype=Windows+10&version=62060833&lang=zh_CN&pass_ticket=t9vr7l7A8MGpzxk6cXnaruelsGe0xhKD70uFBM1XlN2zDOKyjKfw%2BcnxGs70Nt9K',
        },
        {
          title: '2019猪年新春喜乐会',
          image_url: 'https://utcaa.com/wp-content/uploads/2019/03/640-1.png',
          link:
            'https://mp.weixin.qq.com/s?__biz=MzIxMzA3NTA4Mw==&mid=2659075133&idx=1&sn=2526abd020eb7a46d5abb5e47162765b&chksm=8c36b1d9bb4138cf4310dafd7eca267034ac3ef569778c4e133bbd3a945a4ed37baec2f269c6&scene=38#wechat_redirect',
        },
        {
          title: '《荣耀之路：秦朝崛起之考古新视角》公益讲座',
          image_url: 'https://utcaa.com/wp-content/uploads/2019/03/640-_2_.png',
          link:
            'https://mp.weixin.qq.com/s?__biz=MzIxMzA3NTA4Mw==&mid=2659075063&idx=1&sn=fe1e5df16212a69db553fdcf3558931c&chksm=8c36b613bb413f052e8d5f7e1b05690a314c112a82e4b2f1370cd65e607d2045415f88489eb3&scene=38#wechat_redirect',
        },
        {
          title: '2018冬雪烛光宴',
          image_url: 'https://utcaa.com/wp-content/uploads/2019/03/3.png',
          link:
            'https://mp.weixin.qq.com/s?__biz=MzIxMzA3NTA4Mw==&mid=2659075020&idx=2&sn=9cfb13395ab021e7764f737b710fb37f&chksm=8c36b628bb413f3e910145b1d73e4318ac2917a69b593ebab6c47a37d52a4f41e8a1a0ae7856&mpshare=1&scene=1&srcid=03176Jx3BE5uLrzXRkrTrOOW&key=c57cdbea6b0bfc0f63772492c4ecde3ea01d495c40a0a3721dbfa85d49f0aa373310a90755e1d6783bee98200d8d4e1f36f853c58b53570a0bcab7041bff89a4d0a4cad8d4f7ac474e363c43d7eb4a65&ascene=1&uin=MjI3Mjg3NDUwMQ%3D%3D&devicetype=Windows+10&version=62060728&lang=zh_CN&pass_ticket=sB6Q3rXKyJXxJuF9SAztu5QRMAygBgNI%2FmQ4lCGB%2F8qlfsmSOlB3puhFlZZ5QzG7',
        },
        {
          title: '《量子计算》公益科普讲座',
          image_url: 'https://utcaa.com/wp-content/uploads/2019/03/5.png',
          link:
            'https://mp.weixin.qq.com/s?__biz=MzIxMzA3NTA4Mw==&mid=2659075030&idx=2&sn=c7b3cf50e69e6d0b4a467c7d065a72a5&chksm=8c36b632bb413f246691da8ab4201f0b297102b301d12f0023ae3e0c130dbdac0e872f887066&mpshare=1&scene=1&srcid=0317FXugsTSsM1lEpBXa4Lln&key=55e577b9e1d4a28fece869b620d8ae4cbbe8912f5560a6956628a5b23d61b6e391ba20408dc1785fcf77ae5e8f593376a0c250f7a30cec60166691f369db8e8b990ed30f073c297f20ef8d9e58f0c613&ascene=1&uin=MjI3Mjg3NDUwMQ%3D%3D&devicetype=Windows+10&version=62060728&lang=zh_CN&pass_ticket=sB6Q3rXKyJXxJuF9SAztu5QRMAygBgNI%2FmQ4lCGB%2F8qlfsmSOlB3puhFlZZ5QzG7',
        },
        {
          title: 'UTCAA x CCPAA《学习会计的多条出路》免费专题活动',
          image_url: 'https://utcaa.com/wp-content/uploads/2019/03/2.png',
          link:
            'https://mp.weixin.qq.com/s?__biz=MzIxMzA3NTA4Mw==&mid=2659074721&idx=1&sn=0079ae551709ba9d392e01c890824b8a&chksm=8c36b745bb413e53f291a5594a0ebd20dc45610c159806d623a1eaaf219213e4c4c6caed268e&mpshare=1&scene=1&srcid=0317Vy1TCiCZ9SMZuO6A6NRw&key=74916c4c39f91c137390f0cb651d2c71d3a3b95fc0768c4e0e8ea0d2880453e1e57cac265bba9e7a995c60d78b16f3264640ee13e61c808dce4920b489134cfe65e5350f4c0a329eb7f797b7a298a3b5&ascene=1&uin=MjI3Mjg3NDUwMQ%3D%3D&devicetype=Windows+10&version=62060728&lang=zh_CN&pass_ticket=sB6Q3rXKyJXxJuF9SAztu5QRMAygBgNI%2FmQ4lCGB%2F8qlfsmSOlB3puhFlZZ5QzG7',
        },
        {
          title: 'UTCAA x UTCSSA《良师益友》第4期—投资管理&数据分析专场',
          image_url: 'https://utcaa.com/wp-content/uploads/2019/03/4.png',
          link:
            'https://mp.weixin.qq.com/s?__biz=MzIxMzA3NTA4Mw==&mid=2659074682&idx=1&sn=c9f2b9abf697b630f17ca8571e89a411&chksm=8c36b79ebb413e880a8c55fb31d543bbf3d4954d2cf5909d08e209310e22a021609136cc7148&mpshare=1&scene=1&srcid=0317uz8PKQErd3ikWmorbrcO&key=55e577b9e1d4a28f3b00b1fac24efe320771e608f31921287db33ffa4857c62894e2975ddc9d02670c9423f76376c2e25b4d3bdd672dcb379b39d41bebf7346c423851360b3dc1be6e24d4747cd012f1&ascene=1&uin=MjI3Mjg3NDUwMQ%3D%3D&devicetype=Windows+10&version=62060728&lang=zh_CN&pass_ticket=sB6Q3rXKyJXxJuF9SAztu5QRMAygBgNI%2FmQ4lCGB%2F8qlfsmSOlB3puhFlZZ5QzG7',
        },
        {
          title: 'UTCAA x 安大略省证监会 《保护您钱财》专题讲座',
          image_url: 'https://utcaa.com/wp-content/uploads/2019/03/1.png',
          link:
            'https://mp.weixin.qq.com/s?__biz=MzIxMzA3NTA4Mw==&mid=2659074602&idx=1&sn=da411f9968d90a52f390b458bc601afc&chksm=8c36b7cebb413ed84009ab3b679b5a419f1a76f19a1b0898827116902e8b5763195f4f27fe65&mpshare=1&scene=1&srcid=0317cy2oWtGmjENyzSofyYh6&key=55e577b9e1d4a28f16222bf46c63c726d92bf43a4188709ed2d898359d1a133ee7f50d2dff509348e1e7589e996366a95f87ecb57de1892a6dd927fddd89ffbd779adc11576c0430c6e8b6c55dcc23d4&ascene=1&uin=MjI3Mjg3NDUwMQ%3D%3D&devicetype=Windows+10&version=62060728&lang=zh_CN&pass_ticket=sB6Q3rXKyJXxJuF9SAztu5QRMAygBgNI%2FmQ4lCGB%2F8qlfsmSOlB3puhFlZZ5QzG7',
        },
        {
          title: '2017冬雪烛光宴 Christmas Gala',
          image_url: 'https://utcaa.com/wp-content/uploads/2017/12/gala-2017-400x284.jpg',
        },
        {
          title: '2017良师益友mentorship计划',
          image_url: 'https://utcaa.com/wp-content/uploads/2017/11/mentorship-3-400x284.jpg',
        },
        {
          title: '2017大数据行业讲座',
          image_url: 'https://utcaa.com/wp-content/uploads/2017/11/utcaa_2017_dataseminar_5-400x284.jpg',
        },
        {
          title: '2017鸡年新春喜乐会',
          image_url: 'https://utcaa.com/wp-content/uploads/2017/11/9-4-400x284.jpg',
        },
        {
          title: '2016冬雪烛光宴',
          image_url: 'https://utcaa.com/wp-content/uploads/2017/11/1-4-400x284.jpg',
        },
        {
          title: '2016 Startup Symposium',
          image_url: 'https://utcaa.com/wp-content/uploads/2017/11/1-3-400x284.jpg',
        },
        {
          title: '2016新春喜乐会',
          image_url: 'https://utcaa.com/wp-content/uploads/2017/11/1-2-400x284.jpg',
        },
        {
          title: '2015冬雪烛光宴',
          image_url: 'https://utcaa.com/wp-content/uploads/2017/11/1-1-400x284.jpg',
        },
        {
          title: '2015夏季激情漂流',
          image_url: 'https://utcaa.com/wp-content/uploads/2017/11/3-400x284.jpg',
        },
        {
          title: '2015创业讲座',
          image_url: 'https://utcaa.com/wp-content/uploads/2017/11/3-5-400x284.jpg',
        },
        {
          title: '2015跑男活动',
          image_url: 'https://utcaa.com/wp-content/uploads/2017/11/utcaa_2015_runningman_4-1-400x284.jpg',
        },
      ]);
    });
};

const down = queryInterface => {
  console.log('dropping events table...');
  return queryInterface.dropTable('events');
};

module.exports = { up, down };
