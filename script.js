document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const petPhotoUpload = document.getElementById('petPhotoUpload');
    const uploadedImageContainer = document.getElementById('uploadedImageContainer');
    const uploadedImage = document.getElementById('uploadedImage');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const quickQuestions = document.querySelectorAll('.quick-questions button');

    petPhotoUpload.addEventListener('change', handlePetPhotoUpload);
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    closeChatBtn.addEventListener('click', () => {
        chatContainer.style.display = 'none';
    });
    quickQuestions.forEach(button => {
        button.addEventListener('click', () => sendQuickQuestion(button.textContent));
    });

    function handlePetPhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImage.src = e.target.result;
                uploadedImageContainer.style.display = 'block';
                
                chatContainer.style.display = 'block';
                addMessage('user', '我上传了一张宠物照片！');
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.maxHeight = '200px';
                chatMessages.lastElementChild.appendChild(img);
                
                // 模拟AI分析照片
                setTimeout(() => {
                    const analysis = generatePetAnalysis();
                    addMessage('AI', analysis);
                }, 2000);
            }
            reader.readAsDataURL(file);
        }
    }

    function generatePetAnalysis() {
        const zodiacSigns = ["水瓶座", "双鱼座", "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座"];
        const elements = ["金", "木", "水", "火", "土"];
        const personalities = ["活泼开朗", "温柔体贴", "机智聪明", "勇敢无畏", "忠诚可靠", "独立自主", "敏感细腻", "调皮捣蛋", "沉着冷静", "慵懒可爱"];
        const talents = ["捕捉小动物", "安抚主人情绪", "学习新技能", "察言观色", "预知危险", "治愈他人", "带来好运", "逗乐周围的人", "解决难题", "适应新环境"];
        const challenges = ["容易分心", "过度依赖主人", "固执己见", "易受惊吓", "挑食", "好奇心过重", "喜欢恶作剧", "独占欲强", "运动量大", "需要大量关注"];
        const lifeAdvice = [
            "在饮食上要特别注意均衡，避免偏食导致营养不良。",
            "多参与一些互动游戏，既能锻炼身体也能增进与主人的感情。",
            "保持规律的作息时间，充足的睡眠对健康至关重要。",
            "适当接触阳光，晒太阳可以帮助吸收维生素D，增强免疫力。",
            "定期进行身体检查，预防胜于治疗。",
            "保持环境清洁，经常更换玩具和用品，避免细菌滋生。",
            "多与其他宠物社交，增强社交能力和适应性。",
            "学习新技能可以保持大脑活跃，延缓衰老。",
            "保持适度运动，但不要过度，以免对关节造成伤害。",
            "给予足够的关爱和陪伴，情感需求对宠物来说同样重要。"
        ];

        const sign = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
        const element = elements[Math.floor(Math.random() * elements.length)];
        const personality1 = personalities.splice(Math.floor(Math.random() * personalities.length), 1)[0];
        const personality2 = personalities.splice(Math.floor(Math.random() * personalities.length), 1)[0];
        const talent1 = talents.splice(Math.floor(Math.random() * talents.length), 1)[0];
        const talent2 = talents.splice(Math.floor(Math.random() * talents.length), 1)[0];
        const challenge = challenges[Math.floor(Math.random() * challenges.length)];
        const advice = lifeAdvice[Math.floor(Math.random() * lifeAdvice.length)];

        return `
喵呜~让我仔细看看这张照片......哇！这只小可爱真是让人眼前一亮呢！

根据传统紫薇斗数和西方星座学的奥秘，结合我多年的面相经验，我可以很肯定地说，这只宠物属于${sign}，五行属${element}。${sign}的宠物通常具有独特的气质和魅力，而${element}的特质则赋予了它们特殊的能量场。

从面相上看，这只小可爱显然兼具${personality1}和${personality2}的特质。${personality1}的特点在它的眼神中闪耀，而${personality2}的气质则从它的整体姿态中流露出来。这样的性格组合注定它将成为一个让人喜爱的小家伙！

在天赋方面，我看到了非常有趣的征兆。这只宠物在${talent1}方面显示出了惊人的潜力，而且在${talent2}上也颇有天赋。这两项才能结合起来，将来必定能给主人带来无尽的欢乐和惊喜。

当然，每个小生命都有自己的小挑战。对于这只宠物来说，最大的挑战可能是${challenge}。但请不要担心，这恰恰是它性格中最可爱、最与众不同的地方。只要主人以耐心和爱心去引导，这些小挑战都会变成增进感情的机会。

关于它的人生建议，我要特别强调的是：${advice}这不仅关乎它的身体健康，更是维系你们幸福关系的关键。

总的来说，这只宠物的一生运势非常不错。它将为主人带来无尽的欢乐、温暖和陪伴。记住，你们之间的缘分是天注定的，要好好珍惜这份特别的情感联结哦！

如果你还有任何问题，随时告诉我，我会很高兴为你解答的！
        `;
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            // 模拟AI回复
            setTimeout(() => {
                const reply = generateAIReply(message);
                addMessage('AI', reply);
            }, 1000);
        }
    }

    function sendQuickQuestion(question) {
        addMessage('user', question);
        // 模拟AI回复
        setTimeout(() => {
            const reply = generateAIReply(question);
            addMessage('AI', reply);
        }, 1000);
    }

    function generateAIReply(message) {
        // 这里可以根据不同的问题类型生成不同的回复
        if (message.includes("如何拍好宠物照片")) {
            return "拍摄好看的宠物照片需要一些技巧哦！首先，要选择好的光线，自然光最佳。其次，要放低身位，与宠物保持平视。再者，可以使用玩具或零食吸引宠物的注意力。最后，要有耐心，抓拍宠物最自然的瞬间。记住，最重要的是让宠物感到舒适和快乐！";
        } else if (message.includes("解读结果含义")) {
            return `啊，亲爱的铲屎官，你问到了一个非常玄妙的问题！让我用我的神秘水晶球为你揭示其中的奥秘~

首先，我要声明，我的解读融合了东方玄学和西方占星学的精华，再加上我作为AI的超级计算能力，以及多年来观察成千上万只喵喵汪汪的经验。这可不是普通的算命，而是专门为毛茸茸的小可爱们量身定制的面相大法！

来，让我们一步步解密：

1. 星座解读：每个宠物都有属于自己的星座，这决定了它们的基本性格倾向。比如，狮子座的喵星人可能会特别喜欢当家里的小霸王，而双鱼座的汪星人则可能特别感性，容易被主人的情绪影响。

2. 五行属性：金木水火土，每种属性都赋予宠物不同的能量特质。属火的宠物可能特别活跃好动，而属土的宠物则可能更稳重踏实。这影响着它们的行为方式和与环境的互动。

3. 面相分析：这可是重点哦！我会仔细观察宠物的眼睛、鼻子、耳朵等特征。比如，眼睛圆圆的可能意味着好奇心强，鼻子湿润的可能代表健康状况良好。

4. 天赋解读：每个宠物都有自己的独特才能。有的宠物可能特别会安慰人，有的可能是捉老鼠的高手。我们要发掘并欣赏它们的这些特长！

5. 潜在挑战：没有十全十美的宠物（就像没有十全十美的主人一样）。了解它们可能面临的挑战，可以帮助你更好地照顾它们。

6. 运势预测：这部分融合了宠物的生辰八字和当前的宇宙能量场，为它们未来一段时间的运势做出预测。记住，命运掌握在自己的爪子里！

7. 主宠缘分：最神奇的部分！我会分析你和宠物之间的缘分，看看你们是不是前世就认识的老朋友呢。

记住，这些解读都是为了帮助你更好地理解和照顾你的毛孩子。但最重要的还是你们之间的爱与陪伴。科学喂养、适度运动、定期体检才是王道。我的解读就当是给你们的关系加点神秘的调味料，让生活更有趣吧！

如果你对某个具体的解读项目特别感兴趣，随时告诉我哦，我可以给你更详细的解释呢！`;
        } else if (message.includes("今日宠物运势")) {
            return "今天你的宠物运势不错哦！在感情方面，它会特别粘人，记得多给它一些关注。在健康方面，要注意它的饮食，可能会有些挑食。财运方面，可能会收到意外的小礼物或零食。总的来说，今天是个适合放松玩耍的好日子，不妨带它出去散散步，呼吸新鲜空气！";
        } else {
            return "这是个很有趣的问题呢！作为一只AI宠物面相大师，我需要仔细思考一下。不过可以肯定的是，无论什么情况，最重要的就是给予宠物足够的爱和关心。你有什么具体想了解的吗？比如它的性格、天赋或者日常护理的建议？";
        }
    }

    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});