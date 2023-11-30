import regex as re


class NormalizerVietnamese:
    def __init__(self) -> None:
        self.__dicchar = self.__loaddicchar()
        self.__vowles = [['a', 'à', 'á', 'ả', 'ã', 'ạ', 'a'],
                         ['ă', 'ằ', 'ắ', 'ẳ', 'ẵ', 'ặ', 'aw'],
                         ['â', 'ầ', 'ấ', 'ẩ', 'ẫ', 'ậ', 'aa'],
                         ['e', 'è', 'é', 'ẻ', 'ẽ', 'ẹ', 'e'],
                         ['ê', 'ề', 'ế', 'ể', 'ễ', 'ệ', 'ee'],
                         ['i', 'ì', 'í', 'ỉ', 'ĩ', 'ị', 'i'],
                         ['o', 'ò', 'ó', 'ỏ', 'õ', 'ọ', 'o'],
                         ['ô', 'ồ', 'ố', 'ổ', 'ỗ', 'ộ', 'oo'],
                         ['ơ', 'ờ', 'ớ', 'ở', 'ỡ', 'ợ', 'ow'],
                         ['u', 'ù', 'ú', 'ủ', 'ũ', 'ụ', 'u'],
                         ['ư', 'ừ', 'ứ', 'ử', 'ữ', 'ự', 'uw'],
                         ['y', 'ỳ', 'ý', 'ỷ', 'ỹ', 'ỵ', 'y']]
        self.__sign_vietnam = ['', 'f', 's', 'r', 'x', 'j']

        self.__vowles_ids = {}

        for i in range(len(self.__vowles)):
            for j in range(len(self.__vowles[i]) - 1):
                self.__vowles_ids[self.__vowles[i][j]] = (i, j)

    def __loaddicchar(self):
        dic = {}
        char1252 = 'à|á|ả|ã|ạ|ầ|ấ|ẩ|ẫ|ậ|ằ|ắ|ẳ|ẵ|ặ|è|é|ẻ|ẽ|ẹ|ề|ế|ể|ễ|ệ|ì|í|ỉ|ĩ|ị|ò|ó|ỏ|õ|ọ|ồ|ố|ổ|ỗ|ộ|ờ|ớ|ở|ỡ|ợ|ù|ú|ủ|ũ|ụ|ừ|ứ|ử|ữ|ự|ỳ|ý|ỷ|ỹ|ỵ|À|Á|Ả|Ã|Ạ|Ầ|Ấ|Ẩ|Ẫ|Ậ|Ằ|Ắ|Ẳ|Ẵ|Ặ|È|É|Ẻ|Ẽ|Ẹ|Ề|Ế|Ể|Ễ|Ệ|Ì|Í|Ỉ|Ĩ|Ị|Ò|Ó|Ỏ|Õ|Ọ|Ồ|Ố|Ổ|Ỗ|Ộ|Ờ|Ớ|Ở|Ỡ|Ợ|Ù|Ú|Ủ|Ũ|Ụ|Ừ|Ứ|Ử|Ữ|Ự|Ỳ|Ý|Ỷ|Ỹ|Ỵ'.split(
            '|')
        charutf8 = "à|á|ả|ã|ạ|ầ|ấ|ẩ|ẫ|ậ|ằ|ắ|ẳ|ẵ|ặ|è|é|ẻ|ẽ|ẹ|ề|ế|ể|ễ|ệ|ì|í|ỉ|ĩ|ị|ò|ó|ỏ|õ|ọ|ồ|ố|ổ|ỗ|ộ|ờ|ớ|ở|ỡ|ợ|ù|ú|ủ|ũ|ụ|ừ|ứ|ử|ữ|ự|ỳ|ý|ỷ|ỹ|ỵ|À|Á|Ả|Ã|Ạ|Ầ|Ấ|Ẩ|Ẫ|Ậ|Ằ|Ắ|Ẳ|Ẵ|Ặ|È|É|Ẻ|Ẽ|Ẹ|Ề|Ế|Ể|Ễ|Ệ|Ì|Í|Ỉ|Ĩ|Ị|Ò|Ó|Ỏ|Õ|Ọ|Ồ|Ố|Ổ|Ỗ|Ộ|Ờ|Ớ|Ở|Ỡ|Ợ|Ù|Ú|Ủ|Ũ|Ụ|Ừ|Ứ|Ử|Ữ|Ự|Ỳ|Ý|Ỷ|Ỹ|Ỵ".split(
            '|')
        for i in range(len(char1252)):
            dic[char1252[i]] = charutf8[i]
        return dic

    def __vn_word_to_telex_type(self, word):
        sign_sentence = 0
        new_word = ''
        for char in word:
            x, y = self.__vowles_ids.get(char, (-1, -1))
            if x == -1:
                new_word += char
                continue
            if y != 0:
                sign_sentence = y
            new_word += self.__vowles[x][-1]
        new_word += self.__sign_vietnam[sign_sentence]
        return new_word

    def __vn_sentence_to_telex_type(self, sentence):
        """
        Chuyển câu tiếng việt có dấu về kiểu gõ telex.
        :param sentence:
        :return:
        """
        words = sentence.split()
        for index, word in enumerate(words):
            words[index] = self.__vn_word_to_telex_type(word)
        return ' '.join(words)

    def convert_unicode(self, txt):
        return re.sub(
            r'à|á|ả|ã|ạ|ầ|ấ|ẩ|ẫ|ậ|ằ|ắ|ẳ|ẵ|ặ|è|é|ẻ|ẽ|ẹ|ề|ế|ể|ễ|ệ|ì|í|ỉ|ĩ|ị|ò|ó|ỏ|õ|ọ|ồ|ố|ổ|ỗ|ộ|ờ|ớ|ở|ỡ|ợ|ù|ú|ủ|ũ|ụ|ừ|ứ|ử|ữ|ự|ỳ|ý|ỷ|ỹ|ỵ|À|Á|Ả|Ã|Ạ|Ầ|Ấ|Ẩ|Ẫ|Ậ|Ằ|Ắ|Ẳ|Ẵ|Ặ|È|É|Ẻ|Ẽ|Ẹ|Ề|Ế|Ể|Ễ|Ệ|Ì|Í|Ỉ|Ĩ|Ị|Ò|Ó|Ỏ|Õ|Ọ|Ồ|Ố|Ổ|Ỗ|Ộ|Ờ|Ớ|Ở|Ỡ|Ợ|Ù|Ú|Ủ|Ũ|Ụ|Ừ|Ứ|Ử|Ữ|Ự|Ỳ|Ý|Ỷ|Ỹ|Ỵ',
            lambda x: self.__dicchar[x.group()], txt)

    def __is_valid_vietnam_word(self, word):
        chars = list(word)
        index_vowles = -1
        for index, char in enumerate(chars):
            x, y = self.__vowles_ids.get(char, (-1, -1))
            if x != -1:
                if index_vowles == -1:
                    index_vowles = index
                else:
                    if index - index_vowles != 1:
                        return False
                    index_vowles = index
        return True

    def __normalize_word(self, word):
        if not self.__is_valid_vietnam_word(word):
            return word

        chars = list(word)
        sign_sentence = 0
        index_vowles = []
        qu_or_gi = False
        for index, char in enumerate(chars):
            x, y = self.__vowles_ids.get(char, (-1, -1))
            if x == -1:
                continue
            elif x == 9:  # check qu
                if index != 0 and chars[index - 1] == 'q':
                    chars[index] = 'u'
                    qu_or_gi = True
            elif x == 5:  # check gi
                if index != 0 and chars[index - 1] == 'g':
                    chars[index] = 'i'
                    qu_or_gi = True
            if y != 0:
                sign_sentence = y
                chars[index] = self.__vowles[x][0]
            if not qu_or_gi or index != 1:
                index_vowles.append(index)
        if len(index_vowles) < 2:
            if qu_or_gi:
                if len(chars) == 2:
                    x, y = self.__vowles_ids.get(chars[1])
                    chars[1] = self.__vowles[x][sign_sentence]
                else:
                    x, y = self.__vowles_ids.get(chars[2], (-1, -1))
                    if x != -1:
                        chars[2] = self.__vowles[x][sign_sentence]
                    else:
                        chars[1] = self.__vowles[5][sign_sentence] if chars[1] == 'i' else self.__vowles[9][sign_sentence]
                return ''.join(chars)
            return word

        for index in index_vowles:
            x, y = self.__vowles_ids[chars[index]]
            if x == 4 or x == 8:  # ê, ơ
                chars[index] = self.__vowles[x][sign_sentence]
                return ''.join(chars)

        if len(index_vowles) == 2:
            if index_vowles[-1] == len(chars) - 1:
                x, y = self.__vowles_ids[chars[index_vowles[0]]]
                chars[index_vowles[0]] = self.__vowles[x][sign_sentence]
            else:
                x, y = self.__vowles_ids[chars[index_vowles[1]]]
                chars[index_vowles[1]] = self.__vowles[x][sign_sentence]
        else:
            x, y = self.__vowles_ids[chars[index_vowles[1]]]
            chars[index_vowles[1]] = self.__vowles[x][sign_sentence]
        return ''.join(chars)

    def normalize(self, sentence):
        """
            Chuyển câu tiếng việt về chuẩn gõ dấu kiểu cũ.
            :param sentence:
            :return:
            """
        sentence = sentence.lower()
        words = sentence.split()
        for index, word in enumerate(words):
            cw = re.sub(
                r'(^\p{P}*)([p{L}.]*\p{L}+)(\p{P}*$)', r'\1/\2/\3', word).split('/')
            if len(cw) == 3:
                cw[1] = self.__normalize_word(cw[1])
            words[index] = ''.join(cw)
        return ' '.join(words)

    def remove_html(self, txt):
        return re.sub(r'<[^>]*>', '\n', txt)
