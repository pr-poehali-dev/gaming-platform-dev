import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
  plays: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'editor' | 'mygames' | 'profile'>('catalog');

  const sampleGames: Game[] = [
    {
      id: 1,
      title: 'Cyber Runner 3D',
      description: 'Беги по неоновым улицам киберпанк-города',
      image: '/placeholder.svg',
      plays: 1250
    },
    {
      id: 2,
      title: 'Neon Shooter',
      description: 'Футуристичный шутер с элементами киберпанка',
      image: '/placeholder.svg',
      plays: 3420
    },
    {
      id: 3,
      title: 'Matrix Puzzle',
      description: 'Головоломка в стиле цифрового мира',
      image: '/placeholder.svg',
      plays: 890
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <nav className="border-b border-neon-cyan/20 bg-card/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neon-cyan text-glow-cyan">
            CYBER<span className="text-neon-purple">GAME</span>
          </h1>
          
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'catalog' ? 'default' : 'outline'}
              onClick={() => setActiveTab('catalog')}
              className="glow-cyan hover:scale-105 transition-transform"
            >
              <Icon name="Grid3x3" className="mr-2" size={18} />
              Каталог
            </Button>
            <Button
              variant={activeTab === 'editor' ? 'default' : 'outline'}
              onClick={() => setActiveTab('editor')}
              className="glow-purple hover:scale-105 transition-transform"
            >
              <Icon name="Box" className="mr-2" size={18} />
              3D Редактор
            </Button>
            <Button
              variant={activeTab === 'mygames' ? 'default' : 'outline'}
              onClick={() => setActiveTab('mygames')}
              className="glow-cyan hover:scale-105 transition-transform"
            >
              <Icon name="Gamepad2" className="mr-2" size={18} />
              Мои игры
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'outline'}
              onClick={() => setActiveTab('profile')}
              className="glow-purple hover:scale-105 transition-transform"
            >
              <Icon name="User" className="mr-2" size={18} />
              Профиль
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-neon-cyan text-glow-cyan animate-pulse-glow">
                Каталог игр
              </h2>
              <p className="text-muted-foreground text-lg">
                Исследуй мир киберпанк-игр, созданных сообществом
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleGames.map((game) => (
                <Card
                  key={game.id}
                  className="group overflow-hidden border-neon-cyan/30 bg-card/80 backdrop-blur hover:border-neon-cyan hover:glow-cyan transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-video bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center">
                    <Icon name="Gamepad2" size={64} className="text-neon-cyan/50" />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-2xl font-bold text-neon-cyan group-hover:text-glow-cyan transition-all">
                      {game.title}
                    </h3>
                    <p className="text-muted-foreground">{game.description}</p>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2 text-neon-purple">
                        <Icon name="Play" size={16} />
                        <span className="text-sm font-medium">{game.plays} игр</span>
                      </div>
                      <Button size="sm" className="bg-neon-cyan hover:bg-neon-cyan/80 text-dark-bg font-bold">
                        Играть
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-neon-purple text-glow-purple animate-pulse-glow">
                3D Редактор игр
              </h2>
              <p className="text-muted-foreground text-lg">
                Создавай свои 3D игры прямо в браузере
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <Card className="p-4 border-neon-purple/30 bg-card/80 backdrop-blur">
                  <h3 className="text-lg font-bold text-neon-purple mb-4">Инструменты</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start border-neon-purple/30 hover:border-neon-purple">
                      <Icon name="Box" className="mr-2" size={18} />
                      Куб
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-neon-purple/30 hover:border-neon-purple">
                      <Icon name="Circle" className="mr-2" size={18} />
                      Сфера
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-neon-purple/30 hover:border-neon-purple">
                      <Icon name="Triangle" className="mr-2" size={18} />
                      Конус
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-neon-purple/30 hover:border-neon-purple">
                      <Icon name="Lightbulb" className="mr-2" size={18} />
                      Свет
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 border-neon-cyan/30 bg-card/80 backdrop-blur">
                  <h3 className="text-lg font-bold text-neon-cyan mb-4">Свойства</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <label className="text-muted-foreground">Позиция X</label>
                      <input type="number" className="w-full bg-muted/50 border border-neon-cyan/20 rounded px-2 py-1 mt-1" defaultValue={0} />
                    </div>
                    <div>
                      <label className="text-muted-foreground">Позиция Y</label>
                      <input type="number" className="w-full bg-muted/50 border border-neon-cyan/20 rounded px-2 py-1 mt-1" defaultValue={0} />
                    </div>
                    <div>
                      <label className="text-muted-foreground">Позиция Z</label>
                      <input type="number" className="w-full bg-muted/50 border border-neon-cyan/20 rounded px-2 py-1 mt-1" defaultValue={0} />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Card className="border-neon-purple/30 bg-card/50 backdrop-blur overflow-hidden h-[600px] relative glow-purple">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <Icon name="Box" size={120} className="text-neon-purple/50 animate-float" />
                        <div className="absolute inset-0 blur-xl bg-neon-purple/30 animate-pulse-glow" />
                      </div>
                      <p className="text-neon-cyan text-xl font-bold">3D Viewport</p>
                      <p className="text-muted-foreground">Выбери объект слева, чтобы начать</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-neon-purple hover:bg-neon-purple/80 text-white font-bold glow-purple">
                <Icon name="Save" className="mr-2" size={20} />
                Сохранить игру
              </Button>
              <Button size="lg" variant="outline" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10">
                <Icon name="Play" className="mr-2" size={20} />
                Тестировать
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'mygames' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-neon-cyan text-glow-cyan animate-pulse-glow">
                Мои игры
              </h2>
              <p className="text-muted-foreground text-lg">
                Управляй своими проектами
              </p>
            </div>

            <div className="flex justify-center">
              <Button size="lg" className="bg-neon-purple hover:bg-neon-purple/80 text-white font-bold glow-purple">
                <Icon name="Plus" className="mr-2" size={20} />
                Создать новую игру
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-dashed border-2 border-neon-cyan/30 bg-card/50 backdrop-blur p-12 flex flex-col items-center justify-center space-y-4 hover:border-neon-cyan hover:glow-cyan transition-all cursor-pointer">
                <Icon name="Plus" size={48} className="text-neon-cyan/50" />
                <p className="text-neon-cyan font-medium">Начать новый проект</p>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-neon-purple text-glow-purple animate-pulse-glow">
                Профиль
              </h2>
            </div>

            <Card className="border-neon-purple/30 bg-card/80 backdrop-blur p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center glow-cyan">
                  <Icon name="User" size={48} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neon-cyan">CyberDev</h3>
                  <p className="text-muted-foreground">Разработчик игр</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card className="p-4 bg-neon-cyan/10 border-neon-cyan/30 text-center">
                  <div className="text-3xl font-bold text-neon-cyan">0</div>
                  <div className="text-sm text-muted-foreground">Игр создано</div>
                </Card>
                <Card className="p-4 bg-neon-purple/10 border-neon-purple/30 text-center">
                  <div className="text-3xl font-bold text-neon-purple">0</div>
                  <div className="text-sm text-muted-foreground">Всего игр</div>
                </Card>
                <Card className="p-4 bg-neon-cyan/10 border-neon-cyan/30 text-center">
                  <div className="text-3xl font-bold text-neon-cyan">0</div>
                  <div className="text-sm text-muted-foreground">Достижений</div>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-neon-purple">Настройки</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Имя пользователя</label>
                    <input type="text" className="w-full bg-muted/50 border border-neon-purple/20 rounded px-4 py-2 mt-1" defaultValue="CyberDev" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <input type="email" className="w-full bg-muted/50 border border-neon-purple/20 rounded px-4 py-2 mt-1" defaultValue="cyber@example.com" />
                  </div>
                </div>
                <Button className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-bold glow-purple">
                  Сохранить изменения
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-neon-cyan/20 bg-card/50 backdrop-blur-md mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Made with <span className="text-neon-purple">💜</span> in the <span className="text-neon-cyan">Cyber</span> world
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
