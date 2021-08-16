var background = document.getElementById('wesley');
var plusimgs = new Object();
var plusid = 1;

window.addEventListener('load', function() {

    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {

                var images = document.getElementById('image');                
                images.innerHTML += '<li id="plus" name="plus" class="border-4 opacity-50 border-white ml-1 cursor-pointer" onclick="setBackground(this)"><div class="w-48 h-48 bg-gray-300 flex justify-center"><img class="object-contain h-48" src=""></div></li>'

                var element = images.children[images.children.length - 1];
                var img = element.querySelector('img');
                var id = 'plus' + plusid.toString();

                element.id = id;
                plusid++;

                img.onload = () => URL.revokeObjectURL(img.src);
                img.src = URL.createObjectURL(this.files[0]);
                plusimgs[id] = this.files[0];

                setBackground(document.getElementById(id));

                for (var node of document.querySelectorAll('li[name="plus"]')) {
                    node.querySelector('img').src = URL.createObjectURL(plusimgs[node.id]);
                }
                var upload = document.getElementById('upload');
                var newUpload = upload.cloneNode(true);

                upload.remove();
                images.appendChild(newUpload);
        }
    });
});
function setBackground(element) {
    background = element;
    for (var node of document.getElementById('image').children) {
        node.classList.remove("opacity-75");
        node.classList.remove("border-indigo-400");
        node.classList.add("border-white");
        node.classList.add("opacity-50");
    }
    background.classList.add("opacity-75");
    background.classList.add("border-indigo-400");
    background.classList.remove("border-white");
    background.classList.remove("opacity-50");
    if (element.getAttribute('name') == 'plus') {
        document.getElementById('bgimage').setAttribute('src', URL.createObjectURL(plusimgs[element.id]));
    } else {
        var src = 'img/original/' + background.querySelector('img').getAttribute('src').split('/')[2];
        document.getElementById('bgimage').setAttribute('src', src);
    }
}

function setFont(font) {
    document.getElementById('imgText').style.fontFamily = font;
    document.getElementById('fontLabel').innerHTML = font;
}

function setTheme(element) {
    var theme = element.id;
    for (var node of document.getElementById('theme').children) {
        node.classList.remove("border-indigo-300");
    }
    element.classList.add("border-indigo-300");
    if (theme == 'light') {
        document.getElementById('imgDiv').classList.add('bg-white');
        document.getElementById('imgDiv').classList.remove('bg-black');
        document.getElementById('bgimage').classList.add('opacity-70');
        document.getElementById('bgimage').classList.remove('opacity-80');
        document.getElementById('imgText').classList.add('bg-white');
        document.getElementById('imgText').classList.remove('bg-black');
        document.getElementById('quoteText').classList.add('text-gray-800');
        document.getElementById('quoteText').classList.remove('text-gray-300');
        document.getElementById('quoteAuthor').classList.add('text-gray-700');
        document.getElementById('quoteAuthor').classList.remove('text-gray-400');
        document.getElementById('imgText').style.borderColor = 'rgba(171, 173, 176, 0.32)';
        document.getElementById('qmark').style.color = "rgba(107, 114, 128, 0.52)";
    } else {
        document.getElementById('imgDiv').classList.add('bg-black');
        document.getElementById('imgDiv').classList.remove('bg-white');
        document.getElementById('bgimage').classList.add('opacity-80');
        document.getElementById('bgimage').classList.remove('opacity-70');
        document.getElementById('imgText').classList.add('bg-black');
        document.getElementById('imgText').classList.remove('bg-white');
        document.getElementById('quoteText').classList.remove('text-gray-800');
        document.getElementById('quoteText').classList.add('text-gray-300');
        document.getElementById('quoteAuthor').classList.remove('text-gray-700');
        document.getElementById('quoteAuthor').classList.add('text-gray-400');
        document.getElementById('imgText').style.borderColor = 'rgba(82, 75, 87, 0.32)';
        document.getElementById('qmark').style.color = "rgba(156, 163, 175, 0.52)";
    }
}
function setHeader(element) {
    for (var node of document.getElementById('header').children) {
        node.classList.remove("border-indigo-300");
    }
    element.classList.add("border-indigo-300");
    if (element.id == 'empty') {
        document.getElementById('imgHeader').classList.add('hidden');
    } else {
        document.getElementById('imgHeader').classList.remove('hidden');
    }
}
function chooseFile() {
    document.getElementById('imgfile').click();
}
function generate() {
    reset();
    document.getElementById('quoteText').textContent = '„' + document.getElementById('quote').value + '”';
    document.getElementById('quoteAuthor').textContent = '(' + document.getElementById('author').value + ')';
    document.getElementById('imgDiv').classList.remove('hidden');
    document.getElementById('imgText').style.fontSize = (1.48  * document.getElementById('fontsize').value / 100).toString() + 'rem';

    html2canvas(document.getElementById('imgDiv')).then(function(arg) {
        reset();
        arg.id = "canvas2";
        document.getElementById('canvasDiv').innerHTML += "<canvas id='canvas' class='object-contain w-full'></canvas>";
        document.getElementById('canvasDiv').appendChild(arg);
        document.getElementById('canvasDiv').classList.remove('hidden');
        document.getElementById('imgDiv').classList.add('hidden');

        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var height = arg.height - 1;
        var width = arg.width;

        canvas.width = width;
        canvas.height = height;
        context.drawImage(arg, 0, 0, width, height, 0, 0, width, height);
        arg.remove();
    });
}
function restore() {
    setBackground(document.getElementById('wesley'));
    setTheme(document.getElementById('light'));
    setHeader(document.getElementById('empty'));
    setFont('Amiri');
    document.getElementById('fontsize').value = '100';
    reset();
}
function reset() {
    document.getElementById('canvasDiv').innerHTML = "";
}