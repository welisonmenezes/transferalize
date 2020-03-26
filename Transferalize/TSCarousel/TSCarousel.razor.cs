using Microsoft.AspNetCore.Components;

using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{
    public class TSCarouselBase : ComponentBase
    {
        public ElementReference TSCarouselContainer;

        public TSCarouselOptions CarOpts { get; set; }

        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        [Parameter]
        public int Duration { get; set; } = 200;

        [Parameter]
        public int Dist { get; set; } = -100;

        [Parameter]
        public bool FullWidth { get; set; } = false;

        [Parameter]
        public int NumVisible { get; set; } = 3;

        [Parameter]
        public bool NoWrap { get; set; } = false;

        [Parameter]
        public bool Indicators { get; set; } = false;

        [Parameter]
        public int Padding { get; set; } = 0;

        [Parameter]
        public int Shift { get; set; } = 10;

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                SetOptionsByParameters();
                _ = await JSInterop.InvokeAsync<object>("RunTSCarousel", TSCarouselContainer, CarOpts);
                StateHasChanged();
            }
        }

        private void SetOptionsByParameters()
        {
            CarOpts = new TSCarouselOptions
            {
                Duration = Duration,
                Dist = Dist,
                FullWidth = FullWidth,
                NumVisible = NumVisible,
                Indicators = Indicators,
                NoWrap = NoWrap,
                Padding = Padding,
                Shift = Shift
            };
        }

    }
}
